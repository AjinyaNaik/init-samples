import * as sampleRepository from "../repository/sample.repository";
import * as samplePackRepository from "../repository/sample-pack.repository";
import { 
  CreateSampleData, 
  UpdateSampleData,
} from "./dtos/sample.dto";
import { SAMPLE_CATEGORIES, SAMPLE_TYPES } from "../utils/enums/sample.enum";

export const createSample = async (
  data: CreateSampleData
) => {
  if (!data.name || !data.name.trim()) {
    throw new Error("Sample name is required");
  }

  if (!data.audio_url || !data.audio_url.trim()) {
    throw new Error("Audio URL is required");
  }

  if (data.category && !SAMPLE_CATEGORIES.includes(data.category)) {
    throw new Error(
      `Invalid category. Must be one of: ${SAMPLE_CATEGORIES.join(", ")}`
    );
  }

  if (!SAMPLE_TYPES.includes(data.sample_type)) {
    throw new Error(
      `Invalid sample type. Must be one of: ${SAMPLE_TYPES.join(", ")}`
    );
  }

  if (!Array.isArray(data.genres)) {
    throw new Error("Genres must be an array");
  }

  if (
    !data.genres.every(
      (genre) => typeof genre === "string"
    )
  ) {
    throw new Error("Every genre must be a string");
  }

  if (
    data.sample_pack_id !== undefined &&
    data.sample_pack_id !== null
  ) {
    const samplePack =
      await samplePackRepository.findById(
        data.sample_pack_id
      );

    if (!samplePack) {
      throw new Error("Sample pack not found");
    }
  }

  return await sampleRepository.create({
    name: data.name.trim(),
    description: data.description ?? null,
    audio_url: data.audio_url.trim(),
    sample_pack_id: data.sample_pack_id ?? null,
    category: data.category ?? "sample",
    sample_type: data.sample_type,
    is_selling: data.is_selling ?? false,
    genres: data.genres,
    metadata: data.metadata ?? {},
  });
};

export const getAllSamples = async () => {
  return await sampleRepository.findAll();
};

export const getSampleById = async (id: number) => {
  const sample = await sampleRepository.findById(id);

  if (!sample) {
    throw new Error("Sample not found");
  }

  return sample;
};

export const updateSample = async (
  id: number,
  data: UpdateSampleData
) => {
  const existing = await sampleRepository.findById(id);

  if (!existing) {
    throw new Error("Sample not found");
  }

  if (
    data.name !== undefined &&
    !data.name.trim()
  ) {
    throw new Error("Sample name cannot be empty");
  }

  if (
    data.audio_url !== undefined &&
    !data.audio_url.trim()
  ) {
    throw new Error("Audio URL cannot be empty");
  }

  if (
    data.category !== undefined && 
    data.category !== null &&
    !SAMPLE_CATEGORIES.includes(data.category)
  ) {
    throw new Error(
      `Invalid category. Must be one of: ${SAMPLE_CATEGORIES.join(", ")}`
    );
  }

  if (
    data.sample_type !== undefined &&
    !SAMPLE_TYPES.includes(data.sample_type)
  ) {
    throw new Error(
      `Invalid sample type. Must be one of: ${SAMPLE_TYPES.join(", ")}`
    );
  }

  if (data.genres !== undefined) {
    if (!Array.isArray(data.genres)) {
      throw new Error("Genres must be an array");
    }

    if (
      !data.genres.every(
        (genre) => typeof genre === "string"
      )
    ) {
      throw new Error("Every genre must be a string");
    }
  }

  if (
    data.sample_pack_id !== undefined &&
    data.sample_pack_id !== null
  ) {
    const samplePack =
      await samplePackRepository.findById(
        data.sample_pack_id
      );

    if (!samplePack) {
      throw new Error("Sample pack not found");
    }
  }

  return await sampleRepository.update(id, {
    ...data,
    ...(data.name !== undefined && {
      name: data.name.trim(),
    }),
    ...(data.audio_url !== undefined && {
      audio_url: data.audio_url.trim(),
    }),
  });
};

export const deleteSample = async (id: number) => {
  const existing = await sampleRepository.findById(id);

  if (!existing) {
    throw new Error("Sample not found");
  }

  await sampleRepository.remove(id);

  return {
    success: true,
    message: "Sample deleted successfully",
  };
};