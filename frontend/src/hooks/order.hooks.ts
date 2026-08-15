import { useState } from "react";
import type {
  CreateSampleOrderData,
  CreateSamplePackOrderData,
  CreateOrderResponse,
  PurchasedSample,
  PurchasedSamplePack,
} from "../utils/dtos/user.dto";

/*
 * ============================================================
 * Create Order - Standalone Samples
 * POST /orders/samples
 * ============================================================
 */

export const useCreateOrderSamples = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrderSamples = async (
    data: CreateSampleOrderData
  ): Promise<CreateOrderResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/orders/samples",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to create sample order"
        );
      }

      return result as CreateOrderResponse;
    } catch (err: any) {
      setError(
        err.message || "An unexpected error occurred"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createOrderSamples,
    isLoading,
    error,
  };
};


/*
 * ============================================================
 * Get Purchased Standalone Samples
 * GET /orders/my/samples
 * ============================================================
 */

export interface PurchasedSamplesResponse {
  success: boolean;
  message: string;
  data: PurchasedSample[];
}

export const useMyPurchasedSamples = () => {
  const [samples, setSamples] = useState<PurchasedSample[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMyPurchasedSamples =
    async (): Promise<PurchasedSample[]> => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/orders/my/samples",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch purchased samples"
          );
        }

        const data =
          result as PurchasedSamplesResponse;

        setSamples(data.data);

        return data.data;
      } catch (err: any) {
        setError(
          err.message ||
            "An unexpected error occurred"
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

  return {
    samples,
    getMyPurchasedSamples,
    isLoading,
    error,
  };
};


/*
 * ============================================================
 * Create Order - Sample Packs
 * POST /orders/sample-packs
 * ============================================================
 */

export const useCreateOrderSamplePacks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrderSamplePacks = async (
    data: CreateSamplePackOrderData
  ): Promise<CreateOrderResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/orders/sample-packs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to create sample pack order"
        );
      }

      return result as CreateOrderResponse;
    } catch (err: any) {
      setError(
        err.message ||
          "An unexpected error occurred"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createOrderSamplePacks,
    isLoading,
    error,
  };
};


/*
 * ============================================================
 * Get Purchased Sample Packs
 * GET /orders/my/sample-packs
 * ============================================================
 */

export interface PurchasedSamplePacksResponse {
  success: boolean;
  message: string;
  data: PurchasedSamplePack[];
}

export const useMyPurchasedSamplePacks = () => {
  const [samplePacks, setSamplePacks] = useState<
    PurchasedSamplePack[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMyPurchasedSamplePacks =
    async (): Promise<PurchasedSamplePack[]> => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/orders/my/sample-packs",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch purchased sample packs"
          );
        }

        const data =
          result as PurchasedSamplePacksResponse;

        setSamplePacks(data.data);

        return data.data;
      } catch (err: any) {
        setError(
          err.message ||
            "An unexpected error occurred"
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

  return {
    samplePacks,
    getMyPurchasedSamplePacks,
    isLoading,
    error,
  };
};