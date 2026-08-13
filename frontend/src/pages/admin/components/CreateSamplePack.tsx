import { useState } from "react";

const CreateSamplePack = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //const token = localStorage.getItem("token");

    const payload = {
      name,
      description: description || null,
      cover_image: coverImage || null,
    };

    try {
      // TODO: Replace with your actual frontend API call
      /*
      const response = await fetch('/api/sample-packs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Failed to create sample pack');
      alert('Sample pack created!');
      */
      console.log("Submitting Sample Pack:", payload);
      alert("Sample Pack created (Mock)!");
      setName("");
      setDescription("");
      setCoverImage("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Create Sample Pack</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            rows={3}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Cover Image URL</label>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button type="submit" className="mt-4 rounded bg-blue-600 p-2 text-white hover:bg-blue-700">
          Create Pack
        </button>
      </form>
    </div>
  );
};

export default CreateSamplePack;