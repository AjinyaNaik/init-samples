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