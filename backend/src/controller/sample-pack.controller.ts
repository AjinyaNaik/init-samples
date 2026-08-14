import { Request, Response } from "express";
import * as samplePackService from "../service/sample-pack.service";
import { uploadImage } from "../service/storage.service";
import {
  CreateSamplePackRequest,
  UpdateSamplePackRequest,
  GetFilteredPacksQuery,
  StandardResponse,
  SamplePackResponseData
} from "./dtos/sample-pack.dto";
import { getFilterNamesByIds } from "../repository/filter.repository";

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

    //Convert the request body to the service DTO format
    const categoryIds = JSON.parse(req.body.category || "[]");
    const sampleTypeIds = JSON.parse(req.body.sample_type || "[]");
    const genreIds = JSON.parse(req.body.genres || "[]");

    const filters = await getFilterNamesByIds(
  categoryIds,
  sampleTypeIds,
  genreIds
);

const payload = {
  name: req.body.name,
  description: req.body.description,

  category: filters.categories,
  sample_type: filters.sampleTypes,
  genres: filters.genres,

  is_selling: req.body.is_selling === "true",

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

export const getFilteredPacks = async (
  req: Request<{}, {}, {}, GetFilteredPacksQuery>,
  res: Response<StandardResponse<SamplePackResponseData[]>>
) => {
  try {
    const { category, sample_type, genre } = req.query;

    const filtered = await samplePackService.getFilteredSamplePacks({
      category: category || undefined,
      sample_type: sample_type || undefined,
      genre: genre || undefined,
    });

    return res.status(200).json({
      success: true,
      data: filtered,
    });
  } 
  catch (error: any) {
    return res.status(500).json({
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