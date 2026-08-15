import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSamplePackDetail } from "../../hooks/samplePackHooks";

export default function PackDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pack, fetchSamplePackDetail, isLoading, error } = useSamplePackDetail();

  useEffect(() => {
    fetchSamplePackDetail(id).catch((err) => console.error(err));
  }, [id]);

  if (isLoading) return <p className="text-zinc-400 text-center pt-32 animate-pulse">Loading pack details...</p>;
  if (error || !pack) return <p className="text-red-500 text-center pt-32">{error || "Sample pack not found."}</p>;

  return (
    <div className="min-h-screen text-zinc-50 bg-zinc-950 pt-24 px-8 pb-32">
      <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="md:col-span-1 flex flex-col gap-4">
          <div
            className="w-full aspect-square bg-zinc-800 border border-zinc-700 rounded-2xl bg-cover bg-center shadow-lg"
            style={pack.cover_image ? { backgroundImage: `url(${pack.cover_image})` } : undefined}
          ></div>
          <button onClick={() => navigate(-1)} className="text-sm text-purple-400 font-semibold text-center hover:text-purple-300">
            &larr; Back to Catalog
          </button>
        </div>

        <div className="md:col-span-2 flex flex-col">
          <h1 className="text-4xl font-bold mb-2 text-purple-300">{pack.name}</h1>
          <p className="text-zinc-400 mb-6">{pack.description || "No description provided."}</p>

          <h2 className="text-lg font-bold mb-4 border-b border-zinc-800 pb-2">Samples in this Pack</h2>
          <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
            {pack.samples && pack.samples.length > 0 ? (
              pack.samples.map((sample: any) => {
                const isLocked = sample.audio_url === null;
                return (
                  <div
                    key={sample.id}
                    className={`p-4 border rounded-xl flex items-center justify-between transition-all duration-300 relative overflow-hidden ${isLocked
                        ? "bg-zinc-950/40 border-zinc-800/60 opacity-60 hover:opacity-80"
                        : "bg-zinc-950 border-zinc-800"
                      }`}
                  >
                    <div>
                      <h3 className="font-bold text-zinc-100 flex items-center gap-2">
                        {sample.name}
                        {isLocked && (
                          <span className="text-[10px] uppercase font-bold tracking-widest bg-purple-950/80 text-purple-300 border border-purple-800/40 px-2 py-0.5 rounded-full">
                            Locked
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-zinc-500 capitalize">{sample.sample_type?.join(", ")}</p>
                    </div>

                    {isLocked ? (
                      <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800/50 rounded-xl px-4 py-2 text-zinc-400 text-sm font-semibold cursor-default">
                        <svg className="w-4 h-4 text-purple-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="text-xs tracking-wider uppercase text-purple-300">Buy Pack to Play</span>
                      </div>
                    ) : (
                      <audio src={sample.audio_url} controls className="max-w-[150px] md:max-w-xs" />
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-zinc-500 py-6 text-center">This packet has no sample files upload yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}