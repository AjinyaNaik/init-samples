import { useSamplePackAudio } from "../../../hooks/samplePackHooks";
import { useSampleAudioUrl } from "../../../hooks/sampleHooks";
import { useState } from "react";
import JSZip from "jszip";

interface UserRightContentProps {
  activeTab: "packs" | "samples";
  setActiveTab: (tab: "packs" | "samples") => void;
  samplePacks: any[];
  loadingPacks: boolean;
  packsError: string | null;
  samples: any[];
  loadingSamples: boolean;
  samplesError: string | null;
  highlightId?: string | null;
}

export default function UserRightContent({
  activeTab,
  setActiveTab,
  samplePacks,
  loadingPacks,
  packsError,
  samples,
  loadingSamples,
  samplesError,
  highlightId,
}: UserRightContentProps) {
  const { fetchSamplePackAudio, isLoading: packAudioLoading } = useSamplePackAudio();
  const { fetchSampleAudioUrl, isLoading: sampleAudioLoading } = useSampleAudioUrl();
  const [downloadingId, setDownloadingId] = useState<number | null>(null);


const getAudioExtension = (url: string): string => {
  try {
    const pathname = new URL(url).pathname;
    const extension = pathname.split(".").pop()?.toLowerCase();

    if (extension === "wav") return "wav";
    if (extension === "mp3") return "mp3";

    // Default to mp3 if the URL doesn't have a recognizable extension
    return "mp3";
  } catch {
    return "mp3";
  }
};

const handleDownloadFile = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to download audio file.");
    }
 console.log("Response URL:", response.url);
    console.log("Status:", response.status);
    console.log("Content-Type:", response.headers.get("content-type"));
    console.log("Content-Length:", response.headers.get("content-length"));



    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = blobUrl;
    link.setAttribute("download", filename);

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, "_blank");
  }
};

const handleDownloadPack = async (
  packId: number,
  packName: string
) => {
  setDownloadingId(packId);

  try {
    const data = await fetchSamplePackAudio(packId);

    if (!data.samples || data.samples.length === 0) {
      alert("This pack contains no downloadable audio files.");
      return;
    }

    const zip = new JSZip();

    for (const sample of data.samples) {
      if (!sample.audio_url) continue;

      const response = await fetch(sample.audio_url);

      if (!response.ok) {
        throw new Error(`Failed to download ${sample.name || "track"}`);
      }

      const blob = await response.blob();

      const resolvedSampleName = sample.name || "Track";
      const extension = getAudioExtension(sample.audio_url);

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

    alert(`${packName}.zip compiled and downloaded successfully!`);
  } catch (err: any) {
    alert("Download failed: " + err.message);
  } finally {
    setDownloadingId(null);
  }
};

const handleDownloadTrack = async (
  sampleId: number,
  sampleName: string
) => {
  setDownloadingId(sampleId);

  try {
    const audioUrl = await fetchSampleAudioUrl(sampleId);

    if (!audioUrl) {
      throw new Error("Download URL could not be resolved.");
    }

    const extension = getAudioExtension(audioUrl);

    await handleDownloadFile(
      audioUrl,
      `${sampleName}.${extension}`
    );
  } catch (err: any) {
    alert("Download failed: " + err.message);
  } finally {
    setDownloadingId(null);
  }
};



  return (
    <div
      className="md:col-span-3 border border-zinc-800 rounded-[32px] shadow-lg flex flex-col gap-6 overflow-hidden min-h-[500px]"
      style={{ backgroundColor: "rgba(24, 24, 27, 1)" }}
    >
      <style>{`
        @keyframes highlight-bounce-flash {
          0%, 100% {
            transform: translateY(0);
            border-color: rgba(168, 85, 247, 0.4);
            box-shadow: 0 0 0px transparent;
          }
          25% {
            transform: translateY(-8px);
            border-color: #a855f7;
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.8), 0 0 60px rgba(168, 85, 247, 0.4);
          }
          50% {
            transform: translateY(0);
            border-color: #a855f7;
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
          }
          75% {
            transform: translateY(-4px);
            border-color: #a855f7;
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.8);
          }
        }
        .animate-purchased-highlight {
          animation: highlight-bounce-flash 2.2s ease-in-out 3;
        }
      `}</style>

      <div className="flex border-b border-zinc-800/80 bg-zinc-950/20">
        <button
          onClick={() => setActiveTab("packs")}
          className={`flex-1 p-5 text-center font-bold transition-all duration-300 ${activeTab === "packs"
            ? "border-b-2 border-purple-500 text-purple-400 bg-purple-950/10"
            : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/20"
            }`}
        >
          My Packs
        </button>
        <button
          onClick={() => setActiveTab("samples")}
          className={`flex-1 p-5 text-center font-bold transition-all duration-300 ${activeTab === "samples"
            ? "border-b-2 border-purple-500 text-purple-400 bg-purple-950/10"
            : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/20"
            }`}
        >
          My Tracks
        </button>
      </div>

      <div className="p-8 pt-2 flex flex-col flex-grow">
        {activeTab === "packs" ? (
          <div className="flex flex-col flex-grow">
            {packsError && <p className="text-red-500 text-center py-10">{packsError}</p>}

            {loadingPacks ? (
              <p className="text-zinc-400 text-center py-20 animate-pulse">Loading acquired packs...</p>
            ) : samplePacks.length > 0 ? (
              <div className="flex flex-col gap-5 p-1">
                {samplePacks.map((pack) => {
                  const isPackDownloading = downloadingId === pack.id && packAudioLoading;
                  const isHighlighted = highlightId && Number(highlightId) === pack.id;

                  return (
                    <div
                      key={pack.id}
                      className={`p-5 bg-zinc-950 border rounded-2xl flex flex-col gap-4 shadow-sm transition-all ${isHighlighted
                        ? "border-purple-500 animate-purchased-highlight my-2"
                        : "border-zinc-800/85"
                        }`}
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-14 h-12 bg-zinc-800 border border-zinc-700 rounded-lg bg-cover bg-center shrink-0"
                            style={pack.cover_image ? { backgroundImage: `url(${pack.cover_image})` } : undefined}
                          ></div>
                          <div>
                            <h3 className="font-bold text-zinc-100 text-lg">
                              {pack.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-xs text-zinc-500 capitalize">{pack.genres?.join(", ") || "Genres n/a"}</p>
                              {isHighlighted && (
                                <span className="text-[9px] uppercase tracking-widest bg-purple-500 text-white font-extrabold px-2 py-0.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.6)]">
                                  Just Purchased!
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDownloadPack(pack.id, pack.name)}
                          disabled={isPackDownloading}
                          className="px-4 py-2 text-xs font-bold text-purple-300 bg-purple-950/20 border border-purple-800/40 hover:bg-purple-600 hover:text-white rounded-xl transition-all duration-300 transform active:scale-95 disabled:opacity-50 cursor-pointer"
                        >
                          {isPackDownloading ? "Downloading..." : "Download Pack"}
                        </button>
                      </div>

                      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                        {pack.samples && pack.samples.length > 0 ? (
                          pack.samples.map((sample: any) => {
                            const isTrackDownloading = downloadingId === sample.id && sampleAudioLoading;
                            return (
                              <div
                                key={sample.id}
                                className="bg-zinc-900/40 p-3.5 border border-zinc-800/50 rounded-xl flex items-center justify-between hover:border-zinc-800/80 transition-all gap-4"
                              >
                                {/* Left: Track Metadata */}
                                <div className="flex flex-col gap-1 min-w-0 pr-2">
                                  <h4 className="font-semibold text-sm text-zinc-100 truncate">{sample.name}</h4>

                                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-zinc-400 capitalize">
                                    {sample.category?.length > 0 && (
                                      <span className="bg-zinc-800/60 px-1.5 py-0.5 rounded text-zinc-300">
                                        {sample.category.map((cat: string) => cat.replace(/s$/, '')).join(", ")}
                                      </span>
                                    )}
                                    {sample.sample_type?.length > 0 && (
                                      <span>{sample.sample_type.join(", ")}</span>
                                    )}
                                    {sample.genres?.length > 0 && (
                                      <span className="text-zinc-500">
                                        {sample.sample_type?.length > 0 && "•"} {sample.genres.join(", ")}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Right: Audio & Download Action */}
                                <div className="flex items-center gap-3 flex-shrink-0">
                                  <audio
                                    src={sample.preview_url ?? undefined}
                                    controls
                                    className="w-[130px] md:w-[200px] h-8 flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity"
                                  />
                                  <button
                                    onClick={() => handleDownloadTrack(sample.id, sample.name)}
                                    disabled={isTrackDownloading}
                                    className="px-3.5 py-1.5 text-[11px] font-medium text-purple-200 bg-purple-950/30 border border-purple-800/40 hover:bg-purple-600 hover:text-white rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer flex-shrink-0"
                                  >
                                    {isTrackDownloading ? "..." : "Download"}
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-zinc-600 text-xs py-4 text-center">No tracks uploaded to this pack yet.</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-500 flex-grow">
                <p className="text-sm">You haven't acquired any premium packs yet.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col flex-grow">
            {samplesError && <p className="text-red-500 text-center py-10">{samplesError}</p>}

            {loadingSamples ? (
              <p className="text-zinc-400 text-center py-20 animate-pulse">Loading acquired tracks...</p>
            ) : samples.length > 0 ? (
              <div className="flex flex-col gap-5 p-1">
                {samples.map((sample) => {
                  const isTrackDownloading = downloadingId === sample.id && sampleAudioLoading;
                  const isHighlighted = highlightId && Number(highlightId) === sample.id;

                  return (
                    <div
                      key={sample.id}
                      className={`p-5 bg-zinc-950 border rounded-2xl flex flex-col gap-4 shadow-sm transition-all ${isHighlighted
                        ? "border-purple-500 animate-purchased-highlight my-2"
                        : "border-zinc-800/85"
                        }`}
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-12 bg-zinc-800 border border-zinc-700 rounded-lg flex items-center justify-center text-purple-400 shrink-0">
                            <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-zinc-100 text-lg">
                              {sample.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-zinc-400 capitalize -ml-0.75">
                              {sample.category?.length > 0 && (
                                <span className="bg-zinc-800/60 px-1.5 py-0.5 rounded text-zinc-300">
                                  {sample.category.map((cat: string) => cat.replace(/s$/, '')).join(", ")}
                                </span>
                              )}
                              {sample.sample_type?.length > 0 && (
                                <span>{sample.sample_type.join(", ")}</span>
                              )}
                              {sample.genres?.length > 0 && (
                                <span className="text-zinc-500">
                                  {sample.sample_type?.length > 0 && "•"} {sample.genres.join(", ")}
                                </span>
                              )}
                              {isHighlighted && (
                                <span className="text-[9px] uppercase tracking-widest bg-purple-500 text-white font-extrabold px-2 py-0.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.6)]">
                                  Just Purchased!
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDownloadTrack(sample.id, sample.name)}
                          disabled={isTrackDownloading}
                          className="px-4 py-2 text-xs font-bold text-purple-300 bg-purple-950/20 border border-purple-800/40 hover:bg-purple-600 hover:text-white rounded-xl transition-all duration-300 transform active:scale-95 disabled:opacity-50 cursor-pointer"
                        >
                          {isTrackDownloading ? "Downloading..." : "Download Track"}
                        </button>
                      </div>

                      <div className="bg-zinc-900/40 p-3 border border-zinc-800/50 rounded-xl flex items-center justify-between gap-4">
                        <span className="text-xs text-zinc-400 font-semibold px-2">Preview Audio</span>
                        <audio
                          src={sample.preview_url ?? undefined}
                          controls
                          className="w-full max-w-xs md:max-w-md"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-500 flex-grow">
                <p className="text-sm">You haven't acquired any premium standalone tracks yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
