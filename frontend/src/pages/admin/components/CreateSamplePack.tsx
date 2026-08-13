import { useState } from "react";
import { useCreateSamplePack } from "../../../hooks/samplePackHooks";

const CreateSamplePack = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const { createSamplePack, isLoading, error } = useCreateSamplePack();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (description) formData.append("description", description);
    if (coverImage) formData.append("cover_image", coverImage);

    try {
      await createSamplePack(formData);
      
      alert("Sample Pack created!");
      setName("");
      setDescription("");
      setCoverImage(null);

      const fileInput = document.getElementById("coverImage") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } 
    catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Create Sample Pack</h2>
      
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
            rows={3}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Cover Image</label>
          <input
            id="coverImage"
            type="file"
            accept="image/*"
            disabled={isLoading}
            onChange={(e) => setCoverImage(e.target.files ? e.target.files[0] : null)}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none bg-white disabled:bg-gray-100"
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading} 
          className="mt-4 rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Pack"}
        </button>
      </form>
    </div>
  );
};

export default CreateSamplePack;