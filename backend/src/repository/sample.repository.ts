import Sample from "../models/sample.model";
import SamplePack from "../models/sample-pack.model";
import { CreateSampleData, UpdateSampleData } from "../service/dtos/sample.dto";

const samplePackInclude = {
  model: SamplePack,
  as: "sample_pack",
  attributes: [
    "id",
    "name",
    "description",
    "cover_image",
  ],
};

export const create = async (data: CreateSampleData) => {
  const publicSampleAttributes = [
  "id",
  "name",
  "description",
  "preview_url",
  "sample_pack_id",
  "category",
  "sample_type",
  "is_selling",
  "genres",
  "metadata",
  "download_count",
  "created_at",
  "updated_at",
];
  const sample = await Sample.create({
    name: data.name,
    description: data.description ?? null,
    audio_url: data.audio_url,
    preview_url: data.preview_url,
    sample_pack_id: data.sample_pack_id ?? null,
    category: data.category || [],
    sample_type: data.sample_type || [],
    is_selling: data.is_selling ?? false,
    genres: data.genres,
    metadata: data.metadata ?? {},
  });

  return await Sample.findByPk(sample.id, {
    attributes: publicSampleAttributes,
    include: [samplePackInclude],
  });
};

export const findAll = async () => {
  return await Sample.findAll({
    attributes: [
      "id",
      "name",
      "description",
      "preview_url",
      "sample_pack_id",
      "category",
      "sample_type",
      "is_selling",
      "genres",
      "metadata",
      "download_count",
      "created_at",
      "updated_at",
    ],
    include: [samplePackInclude],
    order: [["created_at", "DESC"]],
  });
};

export const findById = async (id: number) => {
  return await Sample.findByPk(id, {
    attributes: [
      "id",
      "name",
      "description",
      "preview_url",
      "sample_pack_id",
      "category",
      "sample_type",
      "is_selling",
      "genres",
      "metadata",
      "download_count",
      "created_at",
      "updated_at",
    ],
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