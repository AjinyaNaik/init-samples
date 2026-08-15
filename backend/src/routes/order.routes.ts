import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createOrder, getMyPurchasedSamples } from "../controller/order.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createOrder
);

router.get(
  "/my/samples",
  authMiddleware,
  getMyPurchasedSamples
);

export default router;