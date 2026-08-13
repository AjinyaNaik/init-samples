export interface CreateSampleData {
  name: string;
  description?: string | null;
  audio_url: string;
  sample_pack_id?: number | null;
  category: string[];
  sample_type: string[];
  is_selling?: boolean;
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
  is_selling?: boolean;
  genres?: string[];
  metadata?: Record<string, any>;
}