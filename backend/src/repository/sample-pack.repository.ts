import SamplePack from "../models/sample-pack.model";
import { SamplePackWithAssociatedSamplesFromQuery } from "../service/dtos/sample-pack.dto";

interface CreateSamplePackData {
  name: string;
  description?: string | null;
  cover_image?: string | null;
  category?: string[];
  sample_type?: string[];
  genres?: string[] | null;
  price: number;
}

interface UpdateSamplePackData {
  name?: string;
  description?: string | null;
  cover_image?: string | null;
  category?: string[];
  sample_type?: string[];
  genres?: string[] | null;
  price: number;
}

export const create = async (
  data: CreateSamplePackData
) => {
  const publicSamplePackAttributes = [
    "id",
    "name",
    "description",
    "cover_image",
    "category",
    "sample_type",
    "genres",
    "download_count",
    "price",
    "created_at",
    "updated_at",
  ];

  return await SamplePack.create({
    name: data.name,
    description: data.description ?? null,
    cover_image: data.cover_image ?? null,
    category: data.category || [],
    sample_type: data.sample_type || [],
    genres: data.genres ?? [],
    price: data.price,
  },);
};
export const findAll = async (): Promise<SamplePackWithAssociatedSamplesFromQuery[]> => {
  return await SamplePack.findAll({
    include: [
      {
        association: "samples",
      },
    ],
    order: [["created_at", "DESC"]],
  }) as unknown as SamplePackWithAssociatedSamplesFromQuery[];
};

export const findById = async (id: number): Promise<SamplePackWithAssociatedSamplesFromQuery | null> => {
  const pack = await SamplePack.findByPk(id, {
    include: [
      {
        association: "samples",
      },
    ],
  });
  return pack as unknown as SamplePackWithAssociatedSamplesFromQuery | null;
};

export const update = async (
  id: number,
  data: UpdateSamplePackData
) => {
  const [updated] = await SamplePack.update(data, {
    where: { id },
  });

  if (!updated) {
    return null;
  }

  return await findById(id);
};

export const remove = async (id: number) => {
  return await SamplePack.destroy({
    where: { id },
  });
};


export const findSamplePackById = async (
  samplePackId: number
) => {
  return await SamplePack.findByPk(samplePackId);
};

export const findSamplePacksByIds = async (
  samplePackIds: number[]
) => {
  return await SamplePack.findAll({
    where: {
      id: samplePackIds,
    },
  });
}

export const findOnlySamplePackSampleAudiosById = async (
  packId: number
) => {
  return await SamplePack.findByPk(packId, {
    attributes: ["id"],
    include: [
      {
        association: "samples",
        attributes: ["id", "audio_url", "name"],
      },
    ],
  });
};