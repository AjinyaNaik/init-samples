import { useState } from "react";
import { useCreateSample } from "../../../hooks/sampleHooks";
import {
  useCategories,
  useSampleTypes,
  useGenres,
} from "../../../hooks/filterHooks";

const CreateSample = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [samplePackId, setSamplePackId] = useState<string>("");

  const [category, setCategory] = useState<string[]>([]);
  const [sampleType, setSampleType] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  const [canPreview, setCanPreview] = useState(false);
  const [metadata, setMetadata] = useState("");

  const { createSample, isLoading, error } = useCreateSample();

  const {
    categories: categoryOptions,
    isLoading: categoriesLoading,
  } = useCategories();

  const {
    sampleTypes: sampleTypeOptions,
    isLoading: sampleTypesLoading,
  } = useSampleTypes();

  const {
    genres: genreOptions,
    isLoading: genresLoading,
  } = useGenres();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    if (!audioFile) {
      alert("Audio file is required.");
      return;
    }

    if (category.length === 0) {
      alert("At least one category is required.");
      return;
    }

    if (sampleType.length === 0) {
      alert("At least one sample type is required.");
      return;
    }

    const isAudio =
      audioFile.type.startsWith("audio/") ||
      audioFile.name.toLowerCase().endsWith(".wav") ||
      audioFile.name.toLowerCase().endsWith(".mp3");

    if (!isAudio) {
      alert("Please select a valid audio file (.wav, .mp3, etc.)");
      return;
    }

    let parsedMetadata = {};
    if (metadata.trim()) {
      try {
        parsedMetadata = JSON.parse(metadata);
      } catch {
        alert("Invalid JSON in metadata field.");
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("audio_file", audioFile);
    formData.append("category", JSON.stringify(category));
    formData.append("sample_type", JSON.stringify(sampleType));
    formData.append("genres", JSON.stringify(genres));
    formData.append("can_preview", String(canPreview));
    formData.append("metadata", JSON.stringify(parsedMetadata));

    if (description.trim()) {
      formData.append("description", description.trim());
    }

    if (samplePackId) {
      formData.append("sample_pack_id", String(Number(samplePackId)));
    }

    try {
      await createSample(formData);

      alert("Sample created!");

      setName("");
      setDescription("");
      setAudioFile(null);
      setSamplePackId("");
      setCategory([]);
      setSampleType([]);
      setGenres([]);
      setCanPreview(false);
      setMetadata("");

      const fileInput = document.getElementById("audioFile") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Create Sample</h2>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Enter sample name"
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
          />
        </div>

        {/* Sample Pack ID & canPreview conditional container */}
        <div className="flex flex-col md:flex-row md:items-end gap-5">
          {/* Sample Pack ID */}
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Sample Pack ID
            </label>
            <input
              type="number"
              value={samplePackId}
              onChange={(e) => setSamplePackId(e.target.value)}
              disabled={isLoading}
              placeholder="Optional"
              className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
            />
            <p className="mt-1 text-xs text-gray-500 font-normal">
              Leave empty to create a standalone sample.
            </p>
          </div>

          {/* Conditional Can Preview Checkbox */}
          {samplePackId.trim() !== "" && (
            <div className="flex items-center gap-2 pb-3 shrink-0 transition-opacity duration-300 animate-fade-in">
              <input
                id="canPreview"
                type="checkbox"
                checked={canPreview}
                onChange={(e) => setCanPreview(e.target.checked)}
                disabled={isLoading}
                className="h-4 w-4"
              />
              <label htmlFor="canPreview" className="text-sm font-medium text-gray-700 font-normal cursor-pointer">
                Can be previewed on site (leave unchecked to lock it)
              </label>
            </div>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 font-bold">Category *</label>
          {categoriesLoading ? (
            <p className="text-sm text-gray-500">Loading categories...</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 rounded border border-gray-300 p-3 md:grid-cols-3">
              {categoryOptions.map((categoryOption) => {
                const isChecked = category.includes(categoryOption.name);
                return (
                  <label
                    key={categoryOption.id}
                    className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-50 font-normal"
                  >
                    <input
                      type="radio"
                      name="adminCategory"
                      checked={isChecked}
                      onChange={() => {
                        setCategory([categoryOption.name]);
                      }}
                      disabled={isLoading}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">{categoryOption.name}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Sample Types */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 font-bold">Sample Types *</label>
          {sampleTypesLoading ? (
            <p className="text-sm text-gray-500">Loading sample types...</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 rounded border border-gray-300 p-3 md:grid-cols-3">
              {sampleTypeOptions.map((sampleTypeOption) => {
                const isChecked = sampleType.includes(sampleTypeOption.name);
                return (
                  <label
                    key={sampleTypeOption.id}
                    className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-50 font-normal"
                  >
                    <input
                      type="radio"
                      name="adminSampleType"
                      checked={isChecked}
                      onChange={() => {
                        setSampleType([sampleTypeOption.name]);
                      }}
                      disabled={isLoading}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">{sampleTypeOption.name}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Genres */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 font-bold">Genres</label>
          {genresLoading ? (
            <p className="text-sm text-gray-500">Loading genres...</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 rounded border border-gray-300 p-3 md:grid-cols-3">
              {genreOptions.map((genre) => (
                <label
                  key={genre.id}
                  className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-50 font-normal"
                >
                  <input
                    type="checkbox"
                    checked={genres.includes(genre.name)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setGenres((prev) => [...prev, genre.name]);
                      } else {
                        setGenres((prev) => prev.filter((name) => name !== genre.name));
                      }
                    }}
                    disabled={isLoading}
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">{genre.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            rows={4}
            placeholder="Describe this sample..."
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
          />
        </div>

        {/* Metadata */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 font-semibold">Metadata</label>
          <textarea
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
            disabled={isLoading}
            rows={4}
            placeholder='{"bpm": 120, "key": "C minor"}'
            className="w-full rounded border border-gray-300 p-2 font-mono text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
          />
          <p className="mt-1 text-xs text-gray-500 font-normal">Must be valid JSON.</p>
        </div>

        {/* Audio File */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 font-semibold">Audio File *</label>
          <input
            id="audioFile"
            type="file"
            accept="audio/*,.wav,.mp3"
            required
            disabled={isLoading}
            onChange={(e) => setAudioFile(e.target.files ? e.target.files[0] : null)}
            className="w-full rounded border border-gray-300 bg-white p-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || categoriesLoading || sampleTypesLoading || genresLoading}
          className="mt-2 rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Sample"}
        </button>
      </form>
    </div>
  );
};

export default CreateSample;