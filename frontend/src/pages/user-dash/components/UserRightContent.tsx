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
  return (
    <div 
      className="md:col-span-3 border border-zinc-800 rounded-[32px] shadow-lg flex flex-col gap-6 overflow-hidden min-h-[500px]"
      style={{ backgroundColor: "rgba(24, 24, 27, 1)" }}
    >
      <div className="flex border-b border-zinc-800/80 bg-zinc-950/20">
        <button
          onClick={() => setActiveTab("packs")}
          className={`flex-1 p-5 text-center font-bold transition-all duration-300 ${
            activeTab === "packs"
              ? "border-b-2 border-purple-500 text-purple-400 bg-purple-950/10"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/20"
          }`}
        >
          My Packs
        </button>
        <button
          onClick={() => setActiveTab("samples")}
          className={`flex-1 p-5 text-center font-bold transition-all duration-300 ${
            activeTab === "samples"
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
                {samplePacks.map((pack) => (
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
                    </div>

                    <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                      {pack.samples && pack.samples.length > 0 ? (
                        pack.samples.map((sample: any) => (
                          <div 
                            key={sample.id} 
                            className="bg-zinc-900/40 p-3 border border-zinc-800/50 rounded-xl flex items-center justify-between hover:border-zinc-800 transition-colors"
                          >
                            <div>
                              <h4 className="font-bold text-sm text-zinc-200">{sample.name}</h4>
                              <p className="text-[10px] text-zinc-500 capitalize mt-0.5">{sample.sample_type?.join(", ")}</p>
                            </div>
                            <audio src={sample.preview_url ?? undefined} controls className="max-w-[130px] md:max-w-[200px]" style={{ transform: "scale(0.85)", transformOrigin: "right center" }} />
                          </div>
                        ))
                      ) : (
                        <p className="text-zinc-600 text-xs py-4 text-center">No tracks uploaded to this pack yet.</p>
                      )}
                    </div>
                  </div>
                ))}
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
                {samples.map((sample) => (
                  <div 
                    key={sample.id} 
                    className="p-4 bg-zinc-950 border border-zinc-800/80 rounded-2xl flex items-center justify-between hover:border-zinc-700 transition-all duration-300"
                  >
                    <div>
                      <h3 className="font-bold text-zinc-100">{sample.name}</h3>
                      <p className="text-xs text-zinc-500 capitalize">{sample.sample_type?.join(", ")}</p>
                    </div>
                    <audio src={sample.preview_url ?? undefined} controls className="max-w-[150px] md:max-w-xs" />
                  </div>
                ))}
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