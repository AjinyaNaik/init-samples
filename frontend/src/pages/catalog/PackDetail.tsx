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
              pack.samples.map((sample: any) => (
                <div key={sample.id} className="bg-zinc-950 p-4 border border-zinc-800 rounded-xl flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-zinc-100">{sample.name}</h3>
                    <p className="text-xs text-zinc-500 capitalize">{sample.sample_type?.join(", ")}</p>
                  </div>
                  <audio src={sample.audio_url} controls className="max-w-[150px] md:max-w-xs" />
                </div>
              ))
            ) : (
              <p className="text-zinc-500 py-6 text-center">This packet has no sample files upload yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}