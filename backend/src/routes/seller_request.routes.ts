import { Router } from "express";
import { cancelMyRequest, createSellerRequest, getMyRequests, getAllSellerRequestsController, approveSellerRequestController, rejectSellerRequestController} from "../controller/seller_request.controller";
import { authMiddleware} from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createSellerRequest
);

router.get(
  "/my",
  authMiddleware,
  getMyRequests
);

router.delete(
  "/:id",
  authMiddleware,
  cancelMyRequest
);

// Admin routes

router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  getAllSellerRequestsController
);

router.patch(
  "/:id/approve",
  authMiddleware,
  adminMiddleware,
  approveSellerRequestController
);

router.patch(
  "/:id/reject",
  authMiddleware,
  adminMiddleware,
  rejectSellerRequestController
);

export default router;