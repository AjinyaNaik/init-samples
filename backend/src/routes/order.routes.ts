import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createOrder, getMyPurchasedSamplesByUserId } from "../controller/order.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createOrder
);

router.get(
  "/my/samples",
  authMiddleware,
  getMyPurchasedSamplesByUserId
);

export default router;