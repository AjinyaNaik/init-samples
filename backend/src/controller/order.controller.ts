import { Request, Response } from "express";
import * as orderService from "../service/order.service";
import { CreateOrderData } from "../service/dtos/order.dto";

export const createOrder = async (
  req: Request<{}, {}, CreateOrderData>,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    console.log("USER ID:", userId);

    const order = await orderService.createOrder(
      userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create order",
    });
  }
};

export const getMyPurchasedSamplesByUserId = async (
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
      message: "Purchased samples retrieved successfully",
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