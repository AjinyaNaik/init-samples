import SamplePack from "../models/sample-pack.model";
import { SamplePackWithAssociatedSamplesFromQuery } from "../service/dtos/sample-pack.dto";

interface CreateSamplePackData {
  name: string;
  description?: string | null;
  cover_image?: string | null;
  category?: string[];
  sample_type?: string[];
  genres?: string[] | null;
  is_selling?: boolean;
}

interface UpdateSamplePackData {
  name?: string;
  description?: string | null;
  cover_image?: string | null;
  category?: string[];
  sample_type?: string[];
  genres?: string[] | null;
  is_selling?: boolean;
}

export const create = async (data: CreateSamplePackData) => {
  return await SamplePack.create(data);
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