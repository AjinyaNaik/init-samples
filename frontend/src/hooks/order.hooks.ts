import { useState } from "react";
import type {
  CreateOrderData,
  CreateOrderResponse,
  PurchasedSample,
} from "../utils/dtos/user.dto";

export const useCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (
    data: CreateOrderData
  ): Promise<CreateOrderResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/orders",
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
          result.message || "Failed to create order"
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
    createOrder,
    isLoading,
    error,
  };
};

export interface PurchasedSamplesResponse {
  success: boolean;
  message: string;
  data: PurchasedSample[];
}

export const useMyPurchasedSamples = () => {
  const [samples, setSamples] = useState<PurchasedSample[]>(
    []
  );

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