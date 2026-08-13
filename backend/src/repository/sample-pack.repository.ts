import SamplePack from "../models/sample-pack.model";

interface CreateSamplePackData {
  name: string;
  description?: string | null;
  cover_image?: string | null;
  category?: string[];
  sample_type?: string[];
  genres?: string[] | null;
}

interface UpdateSamplePackData {
  name?: string;
  description?: string | null;
  cover_image?: string | null;
  category?: string[];
  sample_type?: string[];
  genres?: string[] | null;
}

export const create = async (data: CreateSamplePackData) => {
  return await SamplePack.create(data);
};

export const findAll = async () => {
  return await SamplePack.findAll({
    include: [
      {
        association: "samples",
      },
    ],
    order: [["created_at", "DESC"]],
  });
};

export const findById = async (id: number) => {
  return await SamplePack.findByPk(id, {
    include: [
      {
        association: "samples",
      },
    ],
  });
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