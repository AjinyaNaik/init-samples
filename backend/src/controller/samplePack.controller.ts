import { Request, Response } from "express";
import * as samplePackService from "../service/samplePack.service";

export const createSamplePack = async (
  req: Request,
  res: Response
) => {
  try {
    const samplePack =
      await samplePackService.createSamplePack(
        req.body
      );

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
  res: Response
) => {
  try {
    const samplePacks =
      await samplePackService.getAllSamplePacks();

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
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sample pack ID",
      });
    }

    const samplePack =
      await samplePackService.getSamplePackById(id);

    return res.status(200).json({
      success: true,
      data: samplePack,
    });
  } catch (error: any) {
    const status =
      error.message === "Sample pack not found"
        ? 404
        : 400;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSamplePack = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sample pack ID",
      });
    }

    const samplePack =
      await samplePackService.updateSamplePack(
        id,
        req.body
      );

    return res.status(200).json({
      success: true,
      data: samplePack,
    });
  } catch (error: any) {
    const status =
      error.message === "Sample pack not found"
        ? 404
        : 400;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSamplePack = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sample pack ID",
      });
    }

    const result =
      await samplePackService.deleteSamplePack(id);

    return res.status(200).json(result);
  } catch (error: any) {
    const status =
      error.message === "Sample pack not found"
        ? 404
        : 400;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};