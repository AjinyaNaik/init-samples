import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSampleDetail } from "../../hooks/sampleHooks";
import { useCheckoutSamples } from "../../hooks/stripeHooks";
import RetroStarfield from "../../components/shared/RetroStarfield";

export default function SampleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sample, fetchSampleDetail, isLoading, error } = useSampleDetail();
  const { checkoutSamples, isLoading: isPurchasing, error: purchaseError } = useCheckoutSamples();

  useEffect(() => {
    fetchSampleDetail(id).catch((err) => console.error(err));
  }, [id]);

  const handlePurchase = async () => {
    if (!sample?.id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login?reason=auth_required");
      return;
    }

    try {
      await checkoutSamples([sample.id]);
    } catch (err) {
      console.error("Purchase error:", err);
    }
  };

  if (isLoading) return <p className="text-zinc-400 text-center pt-32 animate-pulse">Loading details...</p>;
  if (error || !sample) return <p className="text-red-500 text-center pt-32">{error || "Sample not found."}</p>;

  return (
    <div className="min-h-screen text-zinc-50 bg-zinc-950 pt-24 px-8 pb-32">

      <RetroStarfield />

      <style>{`
        @keyframes sample-neon-flicker {
          0%, 19%, 21%, 23%, 25%, 20%, 56%, 100% {
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d8b4fe, 0 0 40px #a855f7, 0 0 40px #a855f7;
            opacity: 1;
          }
          20%, 24%, 55% {
            text-shadow: none;
            opacity: 0.4;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-10 md:p-16 shadow-sm flex flex-col gap-6 relative z-10">
        <button onClick={() => navigate(-1)} className="self-start text-sm text-purple-400 font-semibold hover:text-purple-300 transition-colors">
          &larr; Back to Catalog
        </button>

        <h1
          className="text-purple-300 tracking-wide font-normal leading-tight"
          style={{
            fontFamily: "'Shrikhand', cursive",
            animation: "sample-neon-flicker 5s infinite alternate",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",

            paddingTop: "30px",
            paddingBottom: "30px",
            paddingLeft: "30px",
            paddingRight: "30px",
            marginLeft: "-30px",
            marginRight: "-30px",

            fontSize: sample.name.length <= 12
              ? "calc(2.5rem + 1.7vw)"
              : sample.name.length <= 20
                ? "calc(1.8rem + 1.4vw)"
                : sample.name.length <= 30
                  ? "calc(1.4rem + 1vw)"
                  : "calc(1.1rem + 0.7vw)"
          }}
        >
          {sample.name}
        </h1>

        <p className="text-zinc-400 text-lg leading-relaxed">{sample.description || "No description provided."}</p>

        {/* Audio Player Block */}
        <div className="bg-zinc-950 p-4 border border-zinc-800 rounded-2xl flex flex-col gap-4">
          {sample.preview_url ? (
            <audio
              src={`${import.meta.env.VITE_API_BASE_URL}/admin/samples/${sample.id}/preview`}
              controls
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
              className="w-full"
            />
          ) : (
            <p className="text-sm text-zinc-500 italic text-center py-2">Preview audio unavailable.</p>
          )}
        </div>

        {/* Purchase Block (Price + Buy Button) */}
        <div className="bg-zinc-950/70 border border-zinc-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold block mb-1">
              Sample Price
            </span>
            <span className="text-3xl font-extrabold text-purple-300">
              {sample.price ? `$${sample.price}` : "Free"}
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
              <span>Buy Sample Now</span>
            )}
          </button>
        </div>

        {/* Purchase Error Banner */}
        {purchaseError && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-800/60 p-4 rounded-xl text-center">
            {purchaseError}
          </p>
        )}

        {/* Metadata List */}
        <div className="grid grid-cols-3 gap-4 border-t border-zinc-800 pt-6">
          <div>
            <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Categories</span>
            <span className="font-semibold text-zinc-200 capitalize">{sample.category?.join(", ") || "n/a"}</span>
          </div>
          <div>
            <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Type/Instrument</span>
            <span className="font-semibold text-zinc-200 capitalize">{sample.sample_type?.join(", ") || "n/a"}</span>
          </div>
          <div>
            <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Genres</span>
            <span className="font-semibold text-zinc-200 capitalize">{sample.genres?.join(", ") || "n/a"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}