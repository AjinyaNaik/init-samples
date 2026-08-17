export interface CreateSampleData {
  name: string;
  description?: string | null;
  audio_url: string;
  preview_url?: string;
  sample_pack_id?: number | null;
  category: string[];
  sample_type: string[];
  can_preview?: boolean;
  genres: string[];
  metadata?: Record<string, any>;
}

export interface UpdateSampleData {
  name?: string;
  description?: string | null;
  audio_url?: string;
  sample_pack_id?: number | null;
  category?: string[];
  sample_type?: string[];
  can_preview?: boolean;
  genres?: string[];
  metadata?: Record<string, any>;
}

export interface SampleFilterParams {
  category?: string | string[];
  sample_type?: string | string[];
  genre?: string | string[];
}