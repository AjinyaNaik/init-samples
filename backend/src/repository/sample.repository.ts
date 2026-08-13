import Sample from "../models/Sample.model";
import SamplePack from "../models/SamplePack.model";

type SampleType =
  | "DRUMS"
  | "BASS"
  | "MIDS"
  | "HIGHS"
  | "VOCALS";

export interface CreateSampleData {
  name: string;
  description?: string | null;
  audio_url: string;
  sample_pack_id?: number | null;
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
  sample_type?: SampleType;
  is_selling?: boolean;
  genres?: string[];
  metadata?: Record<string, any>;
}

const samplePackInclude = {
  model: SamplePack,
  as: "samplePack",
  attributes: [
    "id",
    "name",
    "description",
    "cover_image",
  ],
};

export const create = async (data: CreateSampleData) => {
  return await Sample.create({
    name: data.name,
    description: data.description ?? null,
    audio_url: data.audio_url,
    sample_pack_id: data.sample_pack_id ?? null,
    sample_type: data.sample_type,
    is_selling: data.is_selling ?? false,
    genres: data.genres,
    metadata: data.metadata ?? {},
  });
};

export const findAll = async () => {
  return await Sample.findAll({
    include: [samplePackInclude],
    order: [["created_at", "DESC"]],
  });
};

export const findById = async (id: number) => {
  return await Sample.findByPk(id, {
    include: [samplePackInclude],
  });
};

export const update = async (
  id: number,
  data: UpdateSampleData
) => {
  const [updated] = await Sample.update(data, {
    where: { id },
  });

  if (!updated) {
    return null;
  }

  return await findById(id);
};
export const remove = async (id: number) => {
  return await Sample.destroy({
    where: { id },
  });
};

export const countByPackId = async (
  sample_pack_id: number
) => {
  return await Sample.count({
    where: {
      sample_pack_id,
    },
  });
};