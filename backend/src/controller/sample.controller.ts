import { Request, Response } from "express";
import * as sampleService from "../service/sample.service";
import { uploadAudio } from "../service/storage.service";
import { 
  CreateSampleRequest, 
  UpdateSampleRequest, 
  StandardResponse, 
  SampleResponseData 
} from "./dtos/sample.dto";
import { CreateSampleData, UpdateSampleData } from "../service/dtos/sample.dto";

export const createSample = async (
  req: Request<{}, {}, CreateSampleRequest>,
  res: Response<StandardResponse<SampleResponseData>>
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

    const genres = req.body.genres ? JSON.parse(req.body.genres) : [];
    const metadata = req.body.metadata ? JSON.parse(req.body.metadata) : {};
    const samplePackId = req.body.sample_pack_id ? Number(req.body.sample_pack_id) : null;
    const isSelling = req.body.is_selling === "true";

    const payload: CreateSampleData = {
      name: req.body.name,
      description: req.body.description || null,
      audio_url: audioUrl,
      sample_pack_id: samplePackId,
      category: req.body.category,
      sample_type: req.body.sample_type,
      is_selling: isSelling,
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
  res: Response<StandardResponse<SampleResponseData[]>>
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
  res: Response<StandardResponse<SampleResponseData>>
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

export const updateSample = async (
  req: Request<{ id: string }, {}, UpdateSampleRequest>,
  res: Response<StandardResponse<SampleResponseData>>
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

    const genres = req.body.genres ? JSON.parse(req.body.genres) : undefined;
    const metadata = req.body.metadata ? JSON.parse(req.body.metadata) : undefined;
    const samplePackId = req.body.sample_pack_id ? Number(req.body.sample_pack_id) : undefined;
    const isSelling = req.body.is_selling !== undefined ? req.body.is_selling === "true" : undefined;

    const payload: UpdateSampleData = {
      ...req.body,
      ...(audioUrl && { audio_url: audioUrl }),
      ...(genres && { genres }),
      ...(metadata && { metadata }),
      ...(samplePackId !== undefined && { sample_pack_id: samplePackId }),
      ...(isSelling !== undefined && { is_selling: isSelling }),
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