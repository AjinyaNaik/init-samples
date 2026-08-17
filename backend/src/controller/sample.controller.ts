import { Request, Response } from "express";
import * as sampleService from "../service/sample.service";
import { createAudioPreview, uploadAudio, uploadAudioPreview } from "../service/storage.service";
import { 
  CreateSampleRequest, 
  UpdateSampleRequest, 
  StandardResponse, 
  GetFilteredSamplesQuery, 
} from "./dtos/sample.dto";
import { CreateSampleData, UpdateSampleData, SampleFilterParams } from "../service/dtos/sample.dto";

export const createSample = async (
  req: Request<{}, {}, CreateSampleRequest>,
  res: Response<StandardResponse<any>>
) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Audio file is required",
      });
    }

    const audioUrl = await uploadAudio(
      file.buffer,
      file.originalname,
      file.mimetype
    );

     const preview = await createAudioPreview(
      file.buffer,
      file.originalname
    );

    const previewUrl = await uploadAudioPreview(
      preview.buffer,
      preview.filename,
      preview.mimetype
    );

    const category = req.body.category ? JSON.parse(req.body.category) : [];
    const sampleType = req.body.sample_type ? JSON.parse(req.body.sample_type) : [];
    const genres = req.body.genres ? JSON.parse(req.body.genres) : [];
    const metadata = req.body.metadata ? JSON.parse(req.body.metadata) : {};
    const samplePackId = req.body.sample_pack_id ? Number(req.body.sample_pack_id) : null;

    const payload: CreateSampleData = {
      name: req.body.name,
      description: req.body.description || null,
      audio_url: audioUrl,
      preview_url: previewUrl,
      sample_pack_id: samplePackId,
      category,
      sample_type: sampleType,
      genres,
      metadata,
    };

    const sample = await sampleService.createSample(payload);

    return res.status(201).json({
      success: true,
      data: sample,
    });
  } 
  catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSamples = async (
  req: Request,
  res: Response<StandardResponse<any[]>>
) => {
  try {
    const samples = await sampleService.getAllSamples();

    return res.status(200).json({
      success: true,
      data: samples,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSample = async (
  req: Request<{ id: string }>,
  res: Response<StandardResponse<any>>
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sample ID",
      });
    }

    const sample = await sampleService.getSampleById(id);

    return res.status(200).json({
      success: true,
      data: sample,
    });
  } catch (error: any) {
    const status = error.message === "Sample not found" ? 404 : 400;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFilteredSamples = async (
  req: Request<{}, {}, {}, GetFilteredSamplesQuery>,
  res: Response<StandardResponse<any[]>>
) => {
  try {
    const { category, sample_type, genre } = req.query;

    const filtered = await sampleService.getFilteredSamples({
      category: category || undefined,
      sample_type: sample_type || undefined,
      genre: genre || undefined,
    });

    return res.status(200).json({
      success: true,
      data: filtered,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSample = async (
  req: Request<{ id: string }, {}, UpdateSampleRequest>,
  res: Response<StandardResponse<any>>
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sample ID",
      });
    }

    const file = req.file;
    let audioUrl = undefined;

    if (file) {
      audioUrl = await uploadAudio(
        file.buffer,
        file.originalname,
        file.mimetype
      );
    }

    const category = req.body.category ? JSON.parse(req.body.category) : undefined;
    const sampleType = req.body.sample_type ? JSON.parse(req.body.sample_type) : undefined;
    const genres = req.body.genres ? JSON.parse(req.body.genres) : undefined;
    const metadata = req.body.metadata ? JSON.parse(req.body.metadata) : undefined;
    const samplePackId = req.body.sample_pack_id ? Number(req.body.sample_pack_id) : undefined;

    const payload: UpdateSampleData = {
      ...req.body,
      ...(audioUrl && { audio_url: audioUrl }),
      ...(category && { category }),
      ...(sampleType && { sample_type: sampleType }),
      ...(genres && { genres }),
      ...(metadata && { metadata }),
      ...(samplePackId !== undefined && { sample_pack_id: samplePackId }),
    };

    const sample = await sampleService.updateSample(id, payload);

    if (!sample) {
      return res.status(404).json({
        success: false,
        message: "Sample not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: sample,
    });
  } catch (error: any) {
    const status = error.message === "Sample not found" ? 404 : 400;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSample = async (
  req: Request<{ id: string }>,
  res: Response<StandardResponse<{ success: boolean; message: string }>>
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sample ID",
      });
    }

    const result = await sampleService.deleteSample(id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    const status = error.message === "Sample not found" ? 404 : 400;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSampleAudioUrl = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const sampleId = Number(req.params.id);

    if (Number.isNaN(sampleId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sample ID",
      });
    }

    const audio =
      await sampleService.getSampleAudioUrl(
        userId,
        sampleId
      );

    return res.status(200).json({
      success: true,
      message: "Sample audio URL retrieved successfully",
      data: audio,
    });
  } catch (error) {
    console.error(
      "Get sample audio URL error:",
      error
    );

    return res.status(403).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve sample audio URL",
    });
  }
};