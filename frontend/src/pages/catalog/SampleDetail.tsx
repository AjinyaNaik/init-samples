import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSampleDetail } from "../../hooks/sampleHooks";

export default function SampleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sample, fetchSampleDetail, isLoading, error } = useSampleDetail();

  useEffect(() => {
    fetchSampleDetail(id).catch((err) => console.error(err));
  }, [id]);

  if (isLoading) return <p className="text-zinc-400 text-center pt-32 animate-pulse">Loading details...</p>;
  if (error || !sample) return <p className="text-red-500 text-center pt-32">{error || "Sample not found."}</p>;

  return (
    <div className="min-h-screen text-zinc-50 bg-zinc-950 pt-24 px-8 pb-32">

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

      <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-16 shadow-sm">
        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-purple-400 font-semibold hover:text-purple-300">
          &larr; Back to Catalog
        </button>

        <h1
          className="mb-4 text-purple-300 tracking-wide font-normal leading-tight" 
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

        <p className="text-zinc-500 mb-6">{sample.description || "No description provided."}</p>

        <div className="bg-zinc-950 p-4 border border-zinc-800 rounded-2xl mb-8 flex flex-col gap-4">
          <audio src={sample.preview_url} controls className="w-full" />
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-6">
          <div>
            <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Categories</span>
            <span className="font-semibold text-zinc-200 capitalize">{sample.category?.join(", ") || "n/a"}</span>
          </div>
          <div>
            <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Type/Instrument</span>
            <span className="font-semibold text-zinc-200 capitalize">{sample.sample_type?.join(", ") || "n/a"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}