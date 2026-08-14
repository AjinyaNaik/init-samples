export interface CreateSamplePackRequest {
  name: string;
  description?: string;
  category?: string;
  sample_type?: string;
  genres?: string;
  is_selling?: string;
}

export interface UpdateSamplePackRequest {
  name?: string;
  description?: string;
}

export interface GetFilteredPacksQuery {
  category?: string | string[];
  sample_type?: string | string[];
  genre?: string | string[];
}

export interface SamplePackResponseData {
  id: number;
  name: string;
  description: string | null;
  cover_image: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface StandardResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}