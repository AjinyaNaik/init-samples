export interface CreateSampleRequest {
  name: string;
  description?: string;
  sample_pack_id?: string;
  category: string; 
  sample_type: string; 
  can_preview: string;
  genres: string; 
  metadata?: string; 
}

export interface UpdateSampleRequest {
  name?: string;
  description?: string;
  sample_pack_id?: string;
  category?: string;
  sample_type?: string;
  can_preview?: string;
  genres?: string;
  metadata?: string;
}

export interface GetFilteredSamplesQuery {
  category?: string | string[];
  sample_type?: string | string[];
  genre?: string | string[];
}

export interface PublicSampleResponseData {
  id: number;
  name: string;
  description: string | null;
  preview_url: string | null;
  sample_pack_id: number | null;
  category: string[];
  sample_type: string[];
  can_preview: boolean;
  genres: string[] | null; 
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface StandardResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}