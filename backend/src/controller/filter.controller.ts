import { Request, Response } from "express";
import * as filterService from "../service/filter.service";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await filterService.getCategories();
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } 
  catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSampleTypes = async (req: Request, res: Response) => {
  try {
    const sampleTypes = await filterService.getSampleTypes();
    return res.status(200).json({
      success: true,
      data: sampleTypes,
    });
  } 
  catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await filterService.getGenres();
    return res.status(200).json({
      success: true,
      data: genres,
    });
  } 
  catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};