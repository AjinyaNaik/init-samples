import { useState } from "react";

export const useCheckoutSamples = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkoutSamples = async (sampleIds: number[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/stripe/checkout/samples`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sample_ids: sampleIds }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to initiate sample checkout.");
      }

      if (result.data?.checkout_url) {
        window.location.href = result.data.checkout_url;
      } 
      else {
        throw new Error("No checkout URL returned from server.");
      }
    } 
    catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      console.error("Stripe Checkout Error:", err);
      throw err;
    } 
    finally {
      setIsLoading(false);
    }
  };

  return {
    checkoutSamples,
    isLoading,
    error,
  };
};

export const useCheckoutSamplePacks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkoutSamplePacks = async (samplePackIds: number[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/stripe/checkout/sample-packs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sample_pack_ids: samplePackIds }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to initiate sample pack checkout."
        );
      }

      if (result.data?.checkout_url) {
        window.location.href = result.data.checkout_url;
      } 
      else {
        throw new Error("No checkout URL returned from server.");
      }
    } 
    catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      console.error("Stripe Checkout Error:", err);
      throw err;
    } 
    finally {
      setIsLoading(false);
    }
  };

  return {
    checkoutSamplePacks,
    isLoading,
    error,
  };
};
