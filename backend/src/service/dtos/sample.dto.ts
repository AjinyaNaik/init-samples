import { SampleType, SampleCategory } from "../../utils/enums/sample.enum";

export interface CreateSampleData {
  name: string;
  description?: string | null;
  audio_url: string;
  sample_pack_id?: number | null;
  category?: SampleCategory;
  sample_type: SampleType;
  is_selling?: boolean;
  genres: string[];
  metadata?: Record<string, any>;
}

export interface UpdateSampleData {
  name?: string;
  description?: string | null;
  audio_url?: string;
  sample_pack_id?: number | null;
  category?: SampleCategory;
  sample_type?: SampleType;
  is_selling?: boolean;
  genres?: string[];
  metadata?: Record<string, any>;
}