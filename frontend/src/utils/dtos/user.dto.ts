export interface CreateSampleOrderData {
  sample_ids: number[];
}

export interface CreateSamplePackOrderData {
  sample_pack_ids: number[];
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
 can_preview: boolean;
  sample_pack_id: number | null;
  category: string[];
  sample_type: string[];
  genres: string[] | null;
  is_selling: boolean;
  download_count: number;
  created_at: string;
  updated_at: string;
}

export interface PurchasedSamplePack {
  id: number;
  name: string;
  description: string | null;
  cover_image: string | null;
  category: string[];
  sample_type: string[];
  genres: string[] | null;
  is_selling: boolean;
  download_count: number;
  samples: PurchasedSample[];
}