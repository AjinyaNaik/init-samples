import { Request, Response } from "express";
import * as sampleService from "../service/sample.service";

export const createSample = async (
  req: Request,
  res: Response
) => {
  try {
    const sample =
      await sampleService.createSample(req.body);

    return res.status(201).json({
      success: true,
      data: sample,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSamples = async (
  req: Request,
  res: Response
) => {
  try {
    const samples =
      await sampleService.getAllSamples();

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
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sample ID",
      });
    }

    const sample =
      await sampleService.getSampleById(id);

    return res.status(200).json({
      success: true,
      data: sample,
    });
  } catch (error: any) {
    const status =
      error.message === "Sample not found"
        ? 404
        : 400;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSample = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sample ID",
      });
    }

    const sample =
      await sampleService.updateSample(
        id,
        req.body
      );

    return res.status(200).json({
      success: true,
      data: sample,
    });
  } catch (error: any) {
    const status =
      error.message === "Sample not found"
        ? 404
        : 400;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSample = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sample ID",
      });
    }

    const result =
      await sampleService.deleteSample(id);

    return res.status(200).json(result);
  } catch (error: any) {
    const status =
      error.message === "Sample not found"
        ? 404
        : 400;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};