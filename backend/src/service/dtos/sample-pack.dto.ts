import Sample from "../../models/sample.model";
import SamplePack from "../../models/sample-pack.model";

export interface CreateSamplePackData {
  name: string;
  description?: string | null;
  cover_image?: string | null;
  category?: string[];
  sample_type?: string[];
  genres?: string[] | null;
  is_selling?: boolean;
}

export interface UpdateSamplePackData {
  name?: string;
  description?: string | null;
  cover_image?: string | null;
  category?: string[];
  sample_type?: string[];
  genres?: string[] | null;
}

export interface FilterParams {
  category?: string | string[];
  sample_type?: string | string[];
  genre?: string | string[];
}

export interface SamplePackWithAssociatedSamplesFromQuery extends SamplePack {
    samples?: Sample[];
  };