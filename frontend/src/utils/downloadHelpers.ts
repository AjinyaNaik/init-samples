import JSZip from "jszip";

const LICENSE_URL = "https://naxqhdcoiedkdsebuazw.supabase.co/storage/v1/object/public/license/LICENSE.txt";

export const getAudioExtension = (url: string): string => {
  try {
    const pathname = new URL(url).pathname;
    const extension = pathname.split(".").pop()?.toLowerCase();
    if (extension === "wav" || extension === "mp3") return extension;
    return "mp3";
  } catch {
    return "mp3";
  }
};

export const fetchAndAddLicense = async (zip: JSZip) => {
  try {
    const response = await fetch(LICENSE_URL);
    if (response.ok) {
      const blob = await response.blob();
      zip.file("LICENSE.txt", blob);
    }
  } catch (err) {
    console.warn("Could not attach license file to zip:", err);
  }
};

export const downloadTrackAsZip = async (
  sampleId: number, 
  sampleName: string, 
  fetchSampleAudioUrl: (id: number) => Promise<string | null>
) => {
  const audioUrl = await fetchSampleAudioUrl(sampleId);

  if (!audioUrl) {
    throw new Error("Download URL could not be resolved.");
  }

  const response = await fetch(audioUrl);
  if (!response.ok) {
    throw new Error("Failed to download audio file.");
  }

  const audioBlob = await response.blob();
  const extension = getAudioExtension(audioUrl);

  const zip = new JSZip();

  await fetchAndAddLicense(zip);
  zip.file(`${sampleName}.${extension}`, audioBlob);

  const zipContent = await zip.generateAsync({
    type: "blob",
  });

  const blobUrl = window.URL.createObjectURL(zipContent);
  const link = document.createElement("a");

  link.href = blobUrl;
  link.setAttribute("download", `${sampleName}.zip`);

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(blobUrl);
};

export const downloadPackAsZip = async (
  packId: number,
  packName: string,
  fetchSamplePackAudio: (id: number) => Promise<any>
) => {
  const data = await fetchSamplePackAudio(packId);

  if (!data.samples || data.samples.length === 0) {
    throw new Error("This pack contains no downloadable audio files.");
  }

  const zip = new JSZip();

  // Attach the license file to the zip root
  await fetchAndAddLicense(zip);

  for (const sample of data.samples) {
    if (!sample.audio_url) continue;

    const response = await fetch(sample.audio_url);

    if (!response.ok) {
      throw new Error(`Failed to download ${sample.name || "track"}`);
    }

    const blob = await response.blob();
    const resolvedSampleName = sample.name || "Track";
    const extension = getAudioExtension(sample.audio_url);

    // Place each sample inside a folder named after the pack
    zip.file(
      `${packName}/${resolvedSampleName}.${extension}`,
      blob
    );
  }

  const zipContent = await zip.generateAsync({
    type: "blob",
  });

  const blobUrl = window.URL.createObjectURL(zipContent);
  const link = document.createElement("a");

  link.href = blobUrl;
  link.setAttribute("download", `${packName}.zip`);

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(blobUrl);
};