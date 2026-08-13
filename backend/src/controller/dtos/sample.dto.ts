import { SampleType, SampleCategory } from "../../utils/enums/sample.enum";

export interface CreateSampleRequest {
  name: string;
  description?: string;
  sample_pack_id?: string;
  category: SampleCategory;
  sample_type: SampleType;
  is_selling: string;
  genres: string; // From FormData as a JSON string
  metadata?: string; // From FormData as a JSON string
}

export interface UpdateSampleRequest {
  name?: string;
  description?: string;
  sample_pack_id?: string;
  category?: SampleCategory;
  sample_type?: SampleType;
  is_selling?: string;
  genres?: string;
  metadata?: string;
}

export interface SampleResponseData {
  id: number;
  name: string;
  description: string | null;
  audio_url: string;
  sample_pack_id: number | null;
  category: SampleCategory;
  sample_type: SampleType;
  is_selling: boolean;
  genres: string[];
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface StandardResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}