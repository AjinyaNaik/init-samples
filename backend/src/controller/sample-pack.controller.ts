import { Request, Response } from "express";
import * as samplePackService from "../service/sample-pack.service";
import { uploadImage } from "../service/storage.service";
import {
  CreateSamplePackRequest,
  UpdateSamplePackRequest,
  StandardResponse,
  SamplePackResponseData
} from "./dtos/sample-pack.dto";

export const createSamplePack = async (
  req: Request<{}, {}, CreateSamplePackRequest>,
  res: Response<StandardResponse<SamplePackResponseData>>
) => {
  try {
    const file = req.file;
    let coverUrl = null;

    if (file) {
      coverUrl = await uploadImage(
        file.buffer,
        file.originalname,
        file.mimetype
      );
    }

    const payload = {
      ...req.body,
      cover_image: coverUrl,
    };

    const samplePack = await samplePackService.createSamplePack(payload);

    return res.status(201).json({
      success: true,
      data: samplePack,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSamplePacks = async (
  req: Request,
  res: Response<StandardResponse<SamplePackResponseData[]>>
) => {
  try {
    const samplePacks = await samplePackService.getAllSamplePacks();

    return res.status(200).json({
      success: true,
      data: samplePacks,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSamplePack = async (
  req: Request<{ id: string }>,
  res: Response<StandardResponse<SamplePackResponseData>>
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sample pack ID",
      });
    }

    const samplePack = await samplePackService.getSamplePackById(id);

    return res.status(200).json({
      success: true,
      data: samplePack,
    });
  } catch (error: any) {
    const status = error.message === "Sample pack not found" ? 404 : 400;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSamplePack = async (
  req: Request<{ id: string }, {}, UpdateSamplePackRequest>,
  res: Response<StandardResponse<SamplePackResponseData>>
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sample pack ID",
      });
    }

    const file = req.file;
    let coverUrl = undefined;

    if (file) {
      coverUrl = await uploadImage(
        file.buffer,
        file.originalname,
        file.mimetype
      );
    }

    const payload: UpdateSamplePackRequest & { cover_image?: string } = {
      ...req.body,
    };

    if (coverUrl) {
      payload.cover_image = coverUrl;
    }

    const samplePack = await samplePackService.updateSamplePack(id, payload);

    if (!samplePack) {
      return res.status(404).json({
        success: false,
        message: "Sample pack not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: samplePack, 
    });
  } 
  catch (error: any) {
    const status = error.message === "Sample pack not found" ? 404 : 400;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSamplePack = async (
  req: Request<{ id: string }>,
  res: Response<StandardResponse<{ success: boolean; message: string }>>
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sample pack ID",
      });
    }

    const result = await samplePackService.deleteSamplePack(id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  }
  catch (error: any) {
    const status = error.message === "Sample pack not found" ? 404 : 400;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};