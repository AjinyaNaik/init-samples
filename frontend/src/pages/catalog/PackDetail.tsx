import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSamplePackDetail } from "../../hooks/samplePackHooks";
import { useCheckoutSamplePacks } from "../../hooks/stripeHooks";
import RetroStarfield from "../../components/shared/RetroStarfield";

export default function PackDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pack, fetchSamplePackDetail, isLoading, error } = useSamplePackDetail();
  const { checkoutSamplePacks, isLoading: isPurchasing, error: purchaseError } = useCheckoutSamplePacks();

  useEffect(() => {
    fetchSamplePackDetail(id).catch((err) => console.error(err));
  }, [id]);

  const handlePurchase = async () => {
    if (!pack?.id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login?reason=auth_required");
      return;
    }

    try {
      await checkoutSamplePacks([pack.id]);
    }
    catch (err) {
      console.error("Purchase error:", err);
    }
  };

  if (isLoading) return <p className="text-zinc-400 text-center pt-32 animate-pulse">Loading pack details...</p>;
  if (error || !pack) return <p className="text-red-500 text-center pt-32">{error || "Sample pack not found."}</p>;

  return (
    <div className="min-h-screen text-zinc-50 bg-zinc-950 pt-8 sm:pt-12 px-4 sm:px-8 pb-32">

      <RetroStarfield />

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

      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-6 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-purple-400 font-semibold hover:text-purple-300 transition-colors py-2 px-4 bg-zinc-900 border border-zinc-800/80 rounded-xl hover:bg-zinc-950 shadow-md cursor-pointer"
        >
          &larr; Back to Catalog
        </button>
      </div>

      {/* Outer Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12 items-start relative z-10">

        {/* Left Column: Cover Art Aspect */}
        <div className="md:col-span-3 flex flex-col gap-6 md:sticky md:top-28 z-20">
          <div
            className="w-full aspect-square bg-zinc-900 border border-zinc-800 rounded-3xl bg-cover bg-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.01] hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
            style={pack.cover_image ? { backgroundImage: `url(${pack.cover_image})` } : undefined}
          ></div>
        </div>

        {/* Right Column: Pack Details & Purchase Action */}
        <div className="md:col-span-3 bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.4)] flex flex-col gap-8">

          {/* Header & Description */}
          <div>
            <h1
              className="pb-3 mb-4 text-purple-300 tracking-wide font-normal leading-tight break-words"
              style={{
                fontFamily: "'Shrikhand', cursive",
                animation: "pack-neon-flicker 5s infinite alternate",
                fontSize: pack.name.length <= 12
                  ? "calc(3.2rem + 1.8vw)"
                  : pack.name.length <= 20
                    ? "calc(2.4rem + 1.4vw)"
                    : "calc(1.8rem + 1.0vw)",
              }}
            >
              {pack.name}
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-normal">
              {pack.description || "No description provided for this pack."}
            </p>
          </div>

          {/* Purchase Block (Price + Buy Button) */}
          <div className="bg-zinc-950/70 border border-zinc-800 p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold block mb-1">
                Pack Price
              </span>
              <span className="text-3xl font-extrabold text-purple-300">
                {pack.price ? `$${pack.price}` : "Free"}
              </span>
            </div>

            <button
              onClick={handlePurchase}
              disabled={isPurchasing}
              className="w-full sm:w-auto px-8 py-3.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-950/60 disabled:text-zinc-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPurchasing ? (
                <>
                  <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Redirecting to Stripe...</span>
                </>
              ) : (
                <span>Buy Pack Now</span>
              )}
            </button>
          </div>

          {/* Purchase Error Banner */}
          {purchaseError && (
            <p className="text-sm text-red-400 bg-red-950/40 border border-red-800/60 p-4 rounded-xl text-center">
              {purchaseError}
            </p>
          )}

          {/* Metadata list */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-zinc-800/60 py-6">
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
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-zinc-100 flex items-center justify-between">
              <span>Pack Contents</span>
              <span className="text-sm font-normal text-zinc-500">
                {pack.samples?.length || 0} tracks
              </span>
            </h2>

            <div className="flex flex-col gap-3">
              {pack.samples && pack.samples.length > 0 ? (
                pack.samples.map((sample: any) => {
                  const isLocked = !sample.can_preview;
                  return (
                    <div
                      key={sample.id}
                      className={`p-4 sm:px-4 sm:py-3 sm:min-h-[5rem] flex-shrink-0 border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-300 relative overflow-hidden ${
                        isLocked
                          ? "bg-zinc-950/40 border-zinc-805/40 opacity-60 hover:opacity-85"
                          : "bg-zinc-950 border-zinc-800/80 hover:border-zinc-700"
                      }`}
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <h3 className="font-bold text-sm md:text-base text-zinc-100 flex flex-wrap items-center gap-2 break-words">
                          {sample.name}
                          {isLocked && (
                            <span className="text-[9px] uppercase font-bold tracking-widest bg-purple-950/80 text-purple-300 border border-purple-800/40 px-2 py-0.5 rounded-full shrink-0">
                              Locked
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-zinc-500 capitalize mt-1">
                          {sample.sample_type?.join(", ")}
                        </p>
                      </div>

                      {isLocked ? (
                        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-850/50 rounded-xl px-4 py-2 text-zinc-400 text-sm font-semibold cursor-default self-start sm:self-auto shrink-0">
                          <svg className="w-4 h-4 text-purple-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span className="text-xs tracking-wider uppercase text-purple-300">Buy Pack to Play</span>
                        </div>
                      ) : (

                        <audio src={`${import.meta.env.VITE_API_BASE_URL}/admin/samples/${sample.id}/preview`} controls controlsList="nodownload" onContextMenu={(e) => e.preventDefault()} className="max-w-[185px] md:max-w-xs" />
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