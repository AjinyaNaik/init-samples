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

      <style>{`
        @keyframes pack-neon-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d8b4fe, 0 0 40px #a855f7, 0 0 80px #a855f7;
            opacity: 1;
          }
          20%, 24%, 55% {
            text-shadow: none;
            opacity: 0.4;
          }
        }
      `}</style>

      {/* Outer Grid is now completely free-standing (no card background) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-12 items-start">

        {/* Left Column: Standalone, Free-standing Cover Art Aspect (Spans 2/5) */}
        <div className="md:col-span-3 flex flex-col gap-6 sticky top-28">
          <div
            className="w-full aspect-square bg-zinc-900 border border-zinc-800 rounded-3xl bg-cover bg-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.01] hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
            style={pack.cover_image ? { backgroundImage: `url(${pack.cover_image})` } : undefined}
          ></div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-purple-400 font-semibold text-center hover:text-purple-300 transition-colors py-3 bg-zinc-900 border border-zinc-800/80 rounded-2xl hover:bg-zinc-900 shadow-md"
          >
            &larr; Back to Catalog
          </button>
        </div>

        {/* Right Column: High-End Card Container containing all details and metadata (Spans 3/5) */}
        <div className="md:col-span-3 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.4)] flex flex-col gap-8">

          {/* Header & Details */}
          <div>
            <h1
              className="pb-3 mb-4 text-purple-300 tracking-wide font-normal leading-tight break-words"
              style={{
                fontFamily: "'Shrikhand', cursive",
                animation: "pack-neon-flicker 5s infinite alternate",
                fontSize: pack.name.length <= 12
                  ? "calc(2.7rem + 1.7vw)"
                  : pack.name.length <= 20
                    ? "calc(2.0rem + 1.4vw)"
                    : "calc(1.5rem + 1.2vw)",
              }}
            >
              {pack.name}
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed font-normal">
              {pack.description || "No description provided for this pack."}
            </p>
          </div>

          {/* Spec/Metadata list */}
          <div className="grid grid-cols-3 gap-4 border-y border-zinc-800/60 py-6">
            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold block mb-1">Categories</span>
              <span className="font-bold text-zinc-200 text-sm capitalize">{pack.category?.join(", ") || "n/a"}</span>
            </div>
            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold block mb-1">Instruments</span>
              <span className="font-bold text-zinc-200 text-sm capitalize">{pack.sample_type?.join(", ") || "n/a"}</span>
            </div>
            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold block mb-1">Genres</span>
              <span className="font-bold text-zinc-200 text-sm capitalize">{pack.genres?.join(", ") || "n/a"}</span>
            </div>
          </div>

          {/* Tracklist Block */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-zinc-100 flex items-center justify-between">
              <span>Pack Contents</span>
              <span className="text-sm font-normal text-zinc-500">
                {pack.samples?.length || 0} tracks
              </span>
            </h2>

            {/* Scrollable container with comfortable spacing */}
            <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2">
              {pack.samples && pack.samples.length > 0 ? (
                pack.samples.map((sample: any) => {
                  const isLocked = sample.preview_url === null;
                  return (
                    <div
                      key={sample.id}
                      className={`p-4 border rounded-2xl flex items-center justify-between transition-all duration-300 relative overflow-hidden ${isLocked
                        ? "bg-zinc-950/40 border-zinc-805/40 opacity-60 hover:opacity-85"
                        : "bg-zinc-950 border-zinc-800/80 hover:border-zinc-700"
                        }`}
                    >
                      <div>
                        <h3 className="font-bold text-sm md:text-base text-zinc-100 flex items-center gap-2">
                          {sample.name}
                          {isLocked && (
                            <span className="text-[9px] uppercase font-bold tracking-widest bg-purple-950/80 text-purple-300 border border-purple-800/40 px-2 py-0.5 rounded-full">
                              Locked
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-zinc-500 capitalize mt-1">
                          {sample.sample_type?.join(", ")}
                        </p>
                      </div>

                      {isLocked ? (
                        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-850/50 rounded-xl px-4 py-2 text-zinc-400 text-sm font-semibold cursor-default">
                          <svg className="w-4 h-4 text-purple-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span className="text-xs tracking-wider uppercase text-purple-300">Buy Pack to Play</span>
                        </div>
                      ) : (
                        <audio src={sample.preview_url} controls className="max-w-[185px] md:max-w-xs" />
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-zinc-500 py-12 text-center border border-dashed border-zinc-800 rounded-3xl bg-zinc-950/20 leading-relaxed text-sm">
                  This pack contains no sample files uploaded yet.
                </p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}