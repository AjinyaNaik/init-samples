import * as samplePackRepository from "../repository/sample-pack.repository";
import {
  CreateSamplePackData,
  UpdateSamplePackData,
  FilterParams
} from "./dtos/sample-pack.dto";
import { matchesFilters } from "../utils/filter";
import { SamplePackWithAssociatedSamplesFromQuery } from "./dtos/sample-pack.dto";
import { userOwnsSamplePack } from "../repository/order.repository";

export const createSamplePack = async (
  data: CreateSamplePackData
) => {
  if (!data.name || !data.name.trim()) {
    throw new Error("Sample pack name is required");
  }
  console.log("Creating sample pack with data:", data);

  return await samplePackRepository.create({
    name: data.name.trim(),
    description: data.description ?? null,
    cover_image: data.cover_image ?? null,
    category: data.category ?? [],
    sample_type: data.sample_type ?? [],
    genres: data.genres ?? [],
    price: data.price,
  });
};

export const getAllSamplePacks = async () => {
  return await samplePackRepository.findAll();
};

export const getSamplePackById = async (id: number): Promise<SamplePackWithAssociatedSamplesFromQuery> => {
  const samplePack = await samplePackRepository.findById(id);

  if (!samplePack) {
    throw new Error("Sample pack not found");
  }

  return samplePack;
};

export const getFilteredSamplePacks = async (filters: FilterParams) => {
  const packs = await samplePackRepository.findAll();

  return packs.filter((pack: any) => {
    return matchesFilters(
      {
        category: pack.category || [],
        sample_type: pack.sample_type || [],
        genres: pack.genres || [],
        price: pack.price,
      },
      filters
    );
  });
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

export const getSamplePackAudio = async (
  userId: number,
  samplePackId: number
) => {
  const samplePack =
    await samplePackRepository.findOnlySamplePackSampleAudiosById(
      samplePackId
    );

  if (!samplePack) {
    throw new Error("Sample pack not found");
  }

  const ownsPack =
    await userOwnsSamplePack(
      userId,
      samplePackId
    );

  if (!ownsPack && samplePack.price !== 0) {
    throw new Error("You do not own this sample pack");
  }

  await samplePackRepository.incrementDownloadCountForSamplePack(samplePackId);

  return samplePack;
};