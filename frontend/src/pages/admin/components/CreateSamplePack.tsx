import { useState } from "react";
import { useCreateSamplePack } from "../../../hooks/samplePackHooks";
import {
  useCategories,
  useSampleTypes,
  useGenres,
} from "../../../hooks/filterHooks";

const CreateSamplePack = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState<number[]>([]);
  const [sampleTypes, setSampleTypes] = useState<number[]>([]);
  const [genres, setGenres] = useState<number[]>([]);

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isSelling, setIsSelling] = useState(false);

  const {
    createSamplePack,
    isLoading,
    error,
  } = useCreateSamplePack();

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

  const handleMultiSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setter: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    const values = Array.from(e.target.selectedOptions).map(
      (option) => Number(option.value)
    );

    setter(values);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    const formData = new FormData();

    formData.append("name", name.trim());

    if (description.trim()) {
      formData.append("description", description.trim());
    }

    /*
     * Send arrays as JSON strings because FormData
     * cannot directly send JavaScript arrays.
     */
    formData.append("category", JSON.stringify(categories));
    formData.append("sample_type", JSON.stringify(sampleTypes));
    formData.append("genres", JSON.stringify(genres));

    formData.append("is_selling", String(isSelling));

    if (coverImage) {
      formData.append("cover_image", coverImage);
    }

    try {
      await createSamplePack(formData);

      alert("Sample Pack created!");

      // Reset form
      setName("");
      setDescription("");
      setCategories([]);
      setSampleTypes([]);
      setGenres([]);
      setCoverImage(null);
      setIsSelling(false);

      const fileInput = document.getElementById(
        "coverImage"
      ) as HTMLInputElement;

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
   <div>
  <h2 className="mb-6 text-xl font-semibold">
    Create Sample Pack
  </h2>

  {error && (
    <div className="mb-4 text-red-600">
      {error}
    </div>
  )}

  <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-5"
  >
    {/* Name */}
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Name *
      </label>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={isLoading}
        className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
        placeholder="Enter sample pack name"
      />
    </div>

    {/* Description */}
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Description
      </label>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
        className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
        rows={4}
        placeholder="Describe this sample pack..."
      />
    </div>

    {/* Categories */}
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Categories
      </label>

      {categoriesLoading ? (
        <p className="text-sm text-gray-500">
          Loading categories...
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-2 rounded border border-gray-300 p-3 md:grid-cols-3">
          {categoryOptions.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={categories.includes(category.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCategories((prev) => [
                      ...prev,
                      category.id,
                    ]);
                  } else {
                    setCategories((prev) =>
                      prev.filter((id) => id !== category.id)
                    );
                  }
                }}
                disabled={isLoading}
                className="h-4 w-4"
              />

              <span className="text-sm text-gray-700">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>

    {/* Sample Types */}
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Sample Types
      </label>

      {sampleTypesLoading ? (
        <p className="text-sm text-gray-500">
          Loading sample types...
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-2 rounded border border-gray-300 p-3 md:grid-cols-3">
          {sampleTypeOptions.map((sampleType) => (
            <label
              key={sampleType.id}
              className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={sampleTypes.includes(sampleType.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSampleTypes((prev) => [
                      ...prev,
                      sampleType.id,
                    ]);
                  } else {
                    setSampleTypes((prev) =>
                      prev.filter(
                        (id) => id !== sampleType.id
                      )
                    );
                  }
                }}
                disabled={isLoading}
                className="h-4 w-4"
              />

              <span className="text-sm text-gray-700">
                {sampleType.name}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>

    {/* Genres */}
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Genres
      </label>

      {genresLoading ? (
        <p className="text-sm text-gray-500">
          Loading genres...
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-2 rounded border border-gray-300 p-3 md:grid-cols-3">
          {genreOptions.map((genre) => (
            <label
              key={genre.id}
              className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={genres.includes(genre.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setGenres((prev) => [
                      ...prev,
                      genre.id,
                    ]);
                  } else {
                    setGenres((prev) =>
                      prev.filter((id) => id !== genre.id)
                    );
                  }
                }}
                disabled={isLoading}
                className="h-4 w-4"
              />

              <span className="text-sm text-gray-700">
                {genre.name}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>

    {/* Cover Image */}
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Cover Image
      </label>

      <input
        id="coverImage"
        type="file"
        accept="image/*"
        disabled={isLoading}
        onChange={(e) =>
          setCoverImage(
            e.target.files
              ? e.target.files[0]
              : null
          )
        }
        className="w-full rounded border border-gray-300 bg-white p-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
      />
    </div>

    {/* Is Selling */}
    <div className="flex items-center gap-2">
      <input
        id="isSelling"
        type="checkbox"
        checked={isSelling}
        onChange={(e) =>
          setIsSelling(e.target.checked)
        }
        disabled={isLoading}
        className="h-4 w-4"
      />

      <label
        htmlFor="isSelling"
        className="text-sm font-medium text-gray-700"
      >
        Make this sample pack available for sale
      </label>
    </div>

    {/* Submit */}
    <button
      type="submit"
      disabled={
        isLoading ||
        categoriesLoading ||
        sampleTypesLoading ||
        genresLoading
      }
      className="mt-2 rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {isLoading ? "Creating..." : "Create Pack"}
    </button>
  </form>
</div>
  );
};

export default CreateSamplePack;