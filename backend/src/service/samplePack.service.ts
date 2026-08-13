import * as samplePackRepository from "../repository/samplePack.repository";

interface CreateSamplePackData {
  name: string;
  description?: string | null;
  cover_image?: string | null;
}

interface UpdateSamplePackData {
  name?: string;
  description?: string | null;
  cover_image?: string | null;
}

export const createSamplePack = async (
  data: CreateSamplePackData
) => {
  if (!data.name || !data.name.trim()) {
    throw new Error("Sample pack name is required");
  }

  return await samplePackRepository.create({
    name: data.name.trim(),
    description: data.description ?? null,
    cover_image: data.cover_image ?? null,
  });
};

export const getAllSamplePacks = async () => {
  return await samplePackRepository.findAll();
};

export const getSamplePackById = async (id: number) => {
  const samplePack = await samplePackRepository.findById(id);

  if (!samplePack) {
    throw new Error("Sample pack not found");
  }

  return samplePack;
};

export const updateSamplePack = async (
  id: number,
  data: UpdateSamplePackData
) => {
  const existing = await samplePackRepository.findById(id);

  if (!existing) {
    throw new Error("Sample pack not found");
  }

  if (data.name !== undefined && !data.name.trim()) {
    throw new Error("Sample pack name cannot be empty");
  }

  return await samplePackRepository.update(id, {
    ...data,
    ...(data.name !== undefined && {
      name: data.name.trim(),
    }),
  });
};

export const deleteSamplePack = async (id: number) => {
  const existing = await samplePackRepository.findById(id);

  if (!existing) {
    throw new Error("Sample pack not found");
  }

  await samplePackRepository.remove(id);

  return {
    success: true,
    message: "Sample pack deleted successfully",
  };
};