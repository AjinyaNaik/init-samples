import { Request, Response } from "express";
import * as orderService from "../service/order.service";
import { CreateOrderData } from "../service/dtos/order.dto";

export const createOrderSamples = async (
  req: Request<{}, {}, CreateOrderData>,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const order =
      await orderService.createOrderSamples(
        userId,
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Sample order created successfully",
      data: order,
    });
  } catch (error) {
    console.error(
      "Create sample order error:",
      error
    );

    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create sample order",
    });
  }
};


export const getMyPurchasedSamples = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const samples =
      await orderService.getMyPurchasedSamples(
        userId
      );

    return res.status(200).json({
      success: true,
      message:
        "Purchased samples retrieved successfully",
      data: samples,
    });
  } catch (error) {
    console.error(
      "Get purchased samples error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve purchased samples",
    });
  }
};


export const createOrderSamplePacks = async (
  req: Request<{}, {}, CreateOrderData>,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const order =
      await orderService.createOrderSamplePacks(
        userId,
        req.body
      );

    return res.status(201).json({
      success: true,
      message:
        "Sample pack order created successfully",
      data: order,
    });
  } catch (error) {
    console.error(
      "Create sample pack order error:",
      error
    );

    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create sample pack order",
    });
  }
};


export const getMyPurchasedSamplePacks = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const samplePacks =
      await orderService.getMyPurchasedSamplePacks(
        userId
      );

    return res.status(200).json({
      success: true,
      message:
        "Purchased sample packs retrieved successfully",
      data: samplePacks,
    });
  } catch (error) {
    console.error(
      "Get purchased sample packs error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve purchased sample packs",
    });
  }
};