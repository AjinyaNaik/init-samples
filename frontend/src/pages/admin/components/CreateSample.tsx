import { useState } from "react";

const CreateSample = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [samplePackId, setSamplePackId] = useState<string>("");
  const [category, setCategory] = useState<"sample" | "loop" | "track or stem">("sample");
  const [sampleType, setSampleType] = useState<"DRUMS" | "BASS" | "MIDS" | "HIGHS" | "VOCALS">("DRUMS");
  const [isSelling, setIsSelling] = useState(false);
  const [genres, setGenres] = useState(""); // We will split this comma-separated string into an array
  const [metadata, setMetadata] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //const token = localStorage.getItem("token");

    let parsedMetadata = {};
    if (metadata.trim()) {
      try {
        parsedMetadata = JSON.parse(metadata);
      } catch (e) {
        alert("Invalid JSON in metadata field.");
        return;
      }
    }

    const payload = {
      name,
      description: description || null,
      audio_url: audioUrl,
      sample_pack_id: samplePackId ? parseInt(samplePackId, 10) : null,
      category,
      sample_type: sampleType,
      is_selling: isSelling,
      genres: genres.split(",").map((g) => g.trim()).filter(Boolean),
      metadata: parsedMetadata,
    };

    try {
      // TODO: Replace with your actual frontend API call
      console.log("Submitting Sample:", payload);
      alert("Sample created (Mock)!");
      
      // Optionally reset form
      setName("");
      setDescription("");
      setAudioUrl("");
      setGenres("");
      setMetadata("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Create Sample</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">Name *</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded border border-gray-300 p-2" />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">Audio URL *</label>
          <input type="text" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} required className="w-full rounded border border-gray-300 p-2" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Sample Pack ID</label>
          <input type="number" value={samplePackId} onChange={(e) => setSamplePackId(e.target.value)} className="w-full rounded border border-gray-300 p-2" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Category *</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="w-full rounded border border-gray-300 p-2 bg-white">
            <option value="sample">Sample</option>
            <option value="loop">Loop</option>
            <option value="track or stem">Track / Stem</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Type *</label>
          <select value={sampleType} onChange={(e) => setSampleType(e.target.value as any)} className="w-full rounded border border-gray-300 p-2 bg-white">
            <option value="DRUMS">Drums</option>
            <option value="BASS">Bass</option>
            <option value="MIDS">Mids</option>
            <option value="HIGHS">Highs</option>
            <option value="VOCALS">Vocals</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Genres (Comma separated) *</label>
          <input type="text" value={genres} onChange={(e) => setGenres(e.target.value)} required placeholder="e.g. Hip-Hop, Trap, Lo-Fi" className="w-full rounded border border-gray-300 p-2" />
        </div>

        <div className="md:col-span-2 flex items-center gap-2">
          <input type="checkbox" id="isSelling" checked={isSelling} onChange={(e) => setIsSelling(e.target.checked)} className="h-4 w-4" />
          <label htmlFor="isSelling" className="text-sm font-medium text-gray-700">For Sale?</label>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded border border-gray-300 p-2" rows={2} />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">Metadata (Valid JSON Format)</label>
          <textarea value={metadata} onChange={(e) => setMetadata(e.target.value)} placeholder='{"bpm": 120, "key": "C minor"}' className="w-full rounded border border-gray-300 p-2 font-mono text-sm" rows={3} />
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="w-full mt-2 rounded bg-blue-600 p-2 text-white hover:bg-blue-700">
            Create Sample
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSample;