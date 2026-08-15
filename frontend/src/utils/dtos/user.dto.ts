export interface CreateOrderData {
  sample_ids?: number[];
  sample_pack_ids?: number[];
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  data: {
    order: any;
    payment_id: string;
    items: any[];
  };
}

export interface PurchasedSample {
  id: number;
  name: string;
  description: string | null;
  audio_url: string | null;
  preview_url: string | null;
  sample_pack_id: number | null;
  category: string[];
  sample_type: string[];
  genres: string[] | null;
  is_selling: boolean;
  download_count: number;
  created_at: string;
  updated_at: string;
}