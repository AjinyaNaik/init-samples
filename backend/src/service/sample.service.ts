import * as sampleRepository from "../repository/sample.repository";
import * as samplePackRepository from "../repository/sample-pack.repository";
import { userOwnsSample} from "../repository/order.repository";  
import {
  CreateSampleData,
  UpdateSampleData,
  SampleFilterParams,
} from "./dtos/sample.dto";
import { matchesFilters } from "../utils/filter";

export const createSample = async (
  data: CreateSampleData
) => {
  if (!data.name || !data.name.trim()) {
    throw new Error("Sample name is required");
  }

  if (!data.audio_url || !data.audio_url.trim()) {
    throw new Error("Audio URL is required");
  }

  if (!Array.isArray(data.category)) {
    throw new Error("Categories must be an array");
  }

  if (!Array.isArray(data.sample_type)) {
    throw new Error("Sample types must be an array");
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
    preview_url: data.preview_url?.trim(),
    sample_pack_id: data.sample_pack_id ?? null,
    category: data.category,
    sample_type: data.sample_type,
    can_preview: data.can_preview ?? false,
    genres: data.genres,
    metadata: data.metadata ?? {},
    price: data.price ?? null,
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

export const getFilteredSamples = async (filters: SampleFilterParams) => {
  const samples = await sampleRepository.findAll();
  
  return samples.filter((sample: any) => {
    return matchesFilters(
      {
        category: sample.category || [],
        sample_type: sample.sample_type || [],
        genres: sample.genres || [],
        price: sample.price,
      },
      filters
    );
  });
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

  if (data.category !== undefined) {
    if (!Array.isArray(data.category)) {
      throw new Error("Categories must be an array");
    }
  }

  if (data.sample_type !== undefined) {
    if (!Array.isArray(data.sample_type)) {
      throw new Error("Sample types must be an array");
    }
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

export const getSampleAudioUrl = async (
  userId: number,
  sampleId: number
) => {
  const sample =
    await sampleRepository.findAudioUrlById(sampleId);

  if (!sample) {
    throw new Error("Sample not found");
  }

  const ownsSample =
    await userOwnsSample(
      userId,
      sampleId
    );

  if (!ownsSample) {
    throw new Error("You do not own this sample");
  }

  return {
    id: sample.id,
    audio_url: sample.audio_url,
  };
};