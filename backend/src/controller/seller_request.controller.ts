import { Request, Response } from "express";
import { requestToBecomeSeller, getMySellerRequests, cancelMySellerRequest, getAllSellerRequests, approveSellerRequest, rejectSellerRequest } from "../service/seller_request.service";

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

export async function getMyRequests(
  req: Request,
  res: Response
) {
  try {
    const userId = req.user!.id;

    const requests = await getMySellerRequests(userId);

    return res.status(200).json({
      requests,
    });
  } catch (error) {
    console.error("Get seller requests error:", error);

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Unable to fetch seller requests.",
    });
  }
}

export async function cancelMyRequest(
  req: Request,
  res: Response
) {
  try {
    const userId = req.user!.id;
    const requestId = Number(req.params.id);

    await cancelMySellerRequest(requestId, userId);

    return res.status(200).json({
      message: "Seller request cancelled successfully.",
    });
  } catch (error) {
    console.error("Cancel seller request error:", error);

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Unable to cancel seller request.",
    });
  }
}

export async function getAllSellerRequestsController(
  req: Request,
  res: Response
) {
  try {
    const requests = await getAllSellerRequests();

    return res.status(200).json({
      requests,
    });
  } catch (error) {
    console.error("Get all seller requests error:", error);

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Unable to fetch seller requests.",
    });
  }
}

export async function approveSellerRequestController(
  req: Request,
  res: Response
) {
  try {
    const adminId = req.user!.id;
    const requestId = Number(req.params.id);

    const sellerRequest = await approveSellerRequest(
      requestId,
      adminId
    );

    return res.status(200).json({
      message: "Seller request approved successfully.",
      sellerRequest,
    });
  } catch (error) {
    console.error("Approve seller request error:", error);

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Unable to approve seller request.",
    });
  }
}

export async function rejectSellerRequestController(
  req: Request,
  res: Response
) {
  try {
    const adminId = req.user!.id;
    const requestId = Number(req.params.id);

    const sellerRequest = await rejectSellerRequest(
      requestId,
      adminId
    );

    return res.status(200).json({
      message: "Seller request rejected successfully.",
      sellerRequest,
    });
  } catch (error) {
    console.error("Reject seller request error:", error);

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Unable to reject seller request.",
    });
  }
}