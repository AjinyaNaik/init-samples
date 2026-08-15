import { Router } from "express";
import {
  createOrderSamples,
  getMyPurchasedSamples,
  createOrderSamplePacks,
  getMyPurchasedSamplePacks,
} from "../controller/order.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

/*
 * Standalone samples
 */
router.post(
  "/samples",
  authMiddleware,
  createOrderSamples
);

router.get(
  "/my/samples",
  authMiddleware,
  getMyPurchasedSamples
);


/*
 * Sample packs
 */
router.post(
  "/sample-packs",
  authMiddleware,
  createOrderSamplePacks
);

router.get(
  "/my/sample-packs",
  authMiddleware,
  getMyPurchasedSamplePacks
);

export default router;