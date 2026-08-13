import { useState } from "react";
import { useCreateSample } from "../../../hooks/sampleHooks";

const CreateSample = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [samplePackId, setSamplePackId] = useState<string>("");
  const [category, setCategory] = useState<"sample" | "loop" | "track or stem">("sample");
  const [sampleType, setSampleType] = useState<"DRUMS" | "BASS" | "MIDS" | "HIGHS" | "VOCALS">("DRUMS");
  const [isSelling, setIsSelling] = useState(false);
  const [genres, setGenres] = useState("");
  const [metadata, setMetadata] = useState("");

  const { createSample, isLoading, error } = useCreateSample();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!audioFile) {
      alert("Audio file is required.");
      return;
    }

    let parsedMetadata = {};
    if (metadata.trim()) {
      try {
        parsedMetadata = JSON.parse(metadata);
      } 
      catch (e) {
        alert("Invalid JSON in metadata field.");
        return;
      }
    }

    const processedGenres = genres.split(",").map((g) => g.trim()).filter(Boolean);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("audio_file", audioFile);
    formData.append("category", category);
    formData.append("sample_type", sampleType);
    formData.append("is_selling", String(isSelling));
    formData.append("genres", JSON.stringify(processedGenres));
    formData.append("metadata", JSON.stringify(parsedMetadata));

    if (description) formData.append("description", description);
    if (samplePackId) formData.append("sample_pack_id", samplePackId);

    try {
      await createSample(formData);

      alert("Sample created!");
      
      setName("");
      setDescription("");
      setAudioFile(null);
      setGenres("");
      setMetadata("");
      
      const fileInput = document.getElementById("audioFile") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } 
    catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Create Sample</h2>
      
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">Name *</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} className="w-full rounded border border-gray-300 p-2 disabled:bg-gray-100" />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">Audio File *</label>
          <input 
            id="audioFile"
            type="file" 
            accept="audio/*" 
            onChange={(e) => setAudioFile(e.target.files ? e.target.files[0] : null)} 
            required 
            disabled={isLoading}
            className="w-full rounded border border-gray-300 p-2 bg-white disabled:bg-gray-100" 
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Sample Pack ID</label>
          <input type="number" value={samplePackId} onChange={(e) => setSamplePackId(e.target.value)} disabled={isLoading} className="w-full rounded border border-gray-300 p-2 disabled:bg-gray-100" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Category *</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as any)} disabled={isLoading} className="w-full rounded border border-gray-300 p-2 bg-white disabled:bg-gray-100">
            <option value="sample">Sample</option>
            <option value="loop">Loop</option>
            <option value="track or stem">Track / Stem</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Type *</label>
          <select value={sampleType} onChange={(e) => setSampleType(e.target.value as any)} disabled={isLoading} className="w-full rounded border border-gray-300 p-2 bg-white disabled:bg-gray-100">
            <option value="DRUMS">Drums</option>
            <option value="BASS">Bass</option>
            <option value="MIDS">Mids</option>
            <option value="HIGHS">Highs</option>
            <option value="VOCALS">Vocals</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Genres (Comma separated) *</label>
          <input type="text" value={genres} onChange={(e) => setGenres(e.target.value)} required disabled={isLoading} placeholder="e.g. Hip-Hop, Trap, Lo-Fi" className="w-full rounded border border-gray-300 p-2 disabled:bg-gray-100" />
        </div>

        <div className="md:col-span-2 flex items-center gap-2">
          <input type="checkbox" id="isSelling" checked={isSelling} disabled={isLoading} onChange={(e) => setIsSelling(e.target.checked)} className="h-4 w-4" />
          <label htmlFor="isSelling" className="text-sm font-medium text-gray-700">For Sale?</label>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} disabled={isLoading} className="w-full rounded border border-gray-300 p-2 disabled:bg-gray-100" rows={2} />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">Metadata (Valid JSON Format)</label>
          <textarea value={metadata} onChange={(e) => setMetadata(e.target.value)} disabled={isLoading} placeholder='{"bpm": 120, "key": "C minor"}' className="w-full rounded border border-gray-300 p-2 font-mono text-sm disabled:bg-gray-100" rows={3} />
        </div>

        <div className="md:col-span-2">
          <button type="submit" disabled={isLoading} className="w-full mt-2 rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50">
            {isLoading ? "Creating..." : "Create Sample"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSample;