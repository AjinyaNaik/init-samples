import { Request, Response } from "express";
import { requestToBecomeSeller } from "../service/seller_request.service";

export async function createSellerRequest(
  req: Request,
  res: Response
) {
  try {
    const userId = req.user!.id;

    const sellerRequest = await requestToBecomeSeller(userId);

    return res.status(201).json({
      message: "Seller request submitted successfully.",
      sellerRequest,
    });
  } catch (error) {
    console.error("Seller request error:", error);

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Unable to submit seller request.",
    });
  }
}