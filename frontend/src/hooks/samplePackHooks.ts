import { useState } from "react";

export const useCreateSamplePack = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSamplePack = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch('http://localhost:3000/admin/sample-packs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to create sample pack');
      }

      return await response.json();
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createSamplePack, isLoading, error };
};

export const useFilteredSamplePacks = () => {
  const [samplePacks, setSamplePacks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFilteredSamplePacks = async (filters: { category?: string[]; sample_type?: string[]; genre?: string[] }) => {
    setIsLoading(true);
    setError(null);

    const queryParams = new URLSearchParams();
    if (filters.category && filters.category.length > 0) {
      queryParams.append("category", filters.category.join(","));
    }
    if (filters.sample_type && filters.sample_type.length > 0) {
      queryParams.append("sample_type", filters.sample_type.join(","));
    }
    if (filters.genre && filters.genre.length > 0) {
      queryParams.append("genre", filters.genre.join(","));
    }

    try {
      const response = await fetch(`http://localhost:3000/admin/sample-packs/filter?${queryParams.toString()}`);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Failed to fetch filtered sample packs");
      }

      setSamplePacks(json.data || []);
      return json.data;
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { samplePacks, fetchFilteredSamplePacks, isLoading, error };
};