import { useState, useEffect } from "react";

export interface FilterItem {
  id: number;
  name: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<FilterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/filters/categories");
        const json = await response.json();
        if (!response.ok) throw new Error(json.message || "Failed to fetch categories");
        setCategories(json.data || []);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
};

export const useSampleTypes = () => {
  const [sampleTypes, setSampleTypes] = useState<FilterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSampleTypes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/filters/sample-types");
        const json = await response.json();
        if (!response.ok) throw new Error(json.message || "Failed to fetch sample types");
        setSampleTypes(json.data || []);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSampleTypes();
  }, []);

  return { sampleTypes, isLoading, error };
};

export const useGenres = () => {
  const [genres, setGenres] = useState<FilterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/filters/genres");
        const json = await response.json();
        if (!response.ok) throw new Error(json.message || "Failed to fetch genres");
        setGenres(json.data || []);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, isLoading, error };
};