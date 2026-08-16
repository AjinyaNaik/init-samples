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
}: UserRightContentProps) {
  const { fetchSamplePackAudio, isLoading: packAudioLoading } = useSamplePackAudio();
  const { fetchSampleAudioUrl, isLoading: sampleAudioLoading } = useSampleAudioUrl();
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const handleDownloadFile = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
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

  const handleDownloadPack = async (packId: number, packName: string) => {
    setDownloadingId(packId);

    try {
      const data = await fetchSamplePackAudio(packId);

      if (!data.samples || data.samples.length === 0) {
        alert("This pack contains no downloadable audio files.");
        return;
      }

      const zip = new JSZip();

      for (const sample of data.samples) {
        if (sample.audio_url) {
          const response = await fetch(sample.audio_url);
          const blob = await response.blob();

          const resolvedSampleName = sample.name ||
            "Track";

          zip.file(`${packName}/${resolvedSampleName}.wav`, blob);
        }
      }

      const zipContent = await zip.generateAsync({ type: "blob" });
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

  const handleDownloadTrack = async (sampleId: number, sampleName: string) => {
    setDownloadingId(sampleId);
    try {
      const audioUrl = await fetchSampleAudioUrl(sampleId);
      if (audioUrl) {
        await handleDownloadFile(audioUrl, `${sampleName}.wav`);
      } else {
        throw new Error("Download URL could not be resolved.");
      }
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
              <div className="flex flex-col gap-5">
                {samplePacks.map((pack) => {
                  const isPackDownloading = downloadingId === pack.id && packAudioLoading;
                  return (
                    <div
                      key={pack.id}
                      className="p-5 bg-zinc-950 border border-zinc-800/85 rounded-2xl flex flex-col gap-4 shadow-sm"
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
                            <p className="text-xs text-zinc-500 capitalize">{pack.genres?.join(", ") || "Genres n/a"}</p>
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
                                className="bg-zinc-900/40 p-3 border border-zinc-800/50 rounded-xl flex items-center justify-between hover:border-zinc-800 transition-colors gap-4"
                              >
                                <div>
                                  <h4 className="font-bold text-sm text-zinc-200">{sample.name}</h4>
                                  <p className="text-[10px] text-zinc-500 capitalize mt-0.5">{sample.sample_type?.join(", ")}</p>
                                </div>

                                <div className="flex items-center gap-4 flex-shrink-0 min-w-[280px] md:min-w-[340px] justify-end">
                                  <audio
                                    src={sample.preview_url ?? undefined}
                                    controls
                                    className="w-[140px] md:w-[220px] flex-shrink-0"
                                    style={{ transform: "scale(0.9)", transformOrigin: "right center" }}
                                  />
                                  <button
                                    onClick={() => handleDownloadTrack(sample.id, sample.name)}
                                    disabled={isTrackDownloading}
                                    className="px-3 py-1.5 text-[10px] font-bold text-purple-300 bg-purple-950/20 border border-purple-800/40 hover:bg-purple-600 hover:text-white rounded-xl transition-all duration-300 transform active:scale-95 disabled:opacity-50 cursor-pointer shrink-0"
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
                <svg className="w-12 h-12 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
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
              <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1">
                {samples.map((sample) => {
                  const isTrackDownloading = downloadingId === sample.id && sampleAudioLoading;
                  return (
                    <div
                      key={sample.id}
                      className="p-4 bg-zinc-950 border border-zinc-800/80 rounded-2xl flex items-center justify-between hover:border-zinc-700 transition-all duration-300"
                    >
                      <div>
                        <h3 className="font-bold text-zinc-100">{sample.name}</h3>
                        <p className="text-xs text-zinc-500 capitalize">{sample.sample_type?.join(", ")}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <audio src={sample.preview_url ?? undefined} controls className="max-w-[125px] md:max-w-xs" />
                        <button
                          onClick={() => handleDownloadTrack(sample.id, sample.name)}
                          disabled={isTrackDownloading}
                          className="px-3 py-2 text-xs font-bold text-purple-300 bg-purple-950/20 border border-purple-800/40 hover:bg-purple-600 hover:text-white rounded-xl transition-all duration-300 transform active:scale-95 disabled:opacity-50 cursor-pointer"
                        >
                          {isTrackDownloading ? "..." : "Download"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-500 flex-grow">
                <svg className="w-12 h-12 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-sm">You haven't acquired any premium standalone tracks yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}