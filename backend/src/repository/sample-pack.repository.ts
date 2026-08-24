import SamplePack from "../models/sample-pack.model";
import Sample from "../models/sample.model";
import { 
  CreateSamplePackData, 
  UpdateSamplePackData, 
  SamplePackWithAssociatedSamplesFromQuery 
} from "../service/dtos/sample-pack.dto";


const publicPackSampleAttributes = [
  "id",
  "name",
  "description",
  "sample_pack_id",
  "category",
  "sample_type",
  "can_preview",
  "genres",
  "metadata",
  "download_count",
  "price",
  "pack_rank",
  "created_at",
  "updated_at",
]; 

export const create = async (
  data: CreateSamplePackData
) => {
  return await SamplePack.create({
    name: data.name,
    description: data.description ?? null,
    cover_image: data.cover_image ?? null,
    category: data.category || [],
    sample_type: data.sample_type || [],
    genres: data.genres ?? [],
    price: data.price,
  });
};

export const findAll = async (): Promise<SamplePackWithAssociatedSamplesFromQuery[]> => {
  return await SamplePack.findAll({
    include: [
      {
        association: "samples",
         attributes: publicPackSampleAttributes,
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
         attributes: publicPackSampleAttributes,
        separate: true,
        order: [["pack_rank", "ASC"]],
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
    include: [
      {
        association: "samples",
          attributes: ["name"],
        separate:true
      },
    ],
  });
};

export const findOnlySamplePackSampleAudiosById = async (
  packId: number
) => {
  return await SamplePack.findByPk(packId, {
    attributes: ["id", "price"],
    include: [
      {
        association: "samples",
        attributes: ["id", "audio_url", "name"],
      },
    ],
  });
};

export const incrementDownloadCountForSamplePack = async (
  packId: number,
  transaction?: any
) => {
  await SamplePack.increment("download_count", {
    by: 1,
    where: {
      id: packId,
    },
    transaction,
  });

  await Sample.increment("download_count", {
    by: 1,
    where: {
      sample_pack_id: packId,
    },
    transaction,
  });
};