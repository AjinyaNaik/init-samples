import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createSampleCheckoutSession,
  createSamplePackCheckoutSession,
} from "../controller/stripe.controller";

const router = Router();

router.post("/checkout/samples", authMiddleware, createSampleCheckoutSession);
router.post("/checkout/sample-packs", authMiddleware, createSamplePackCheckoutSession);

export default router;
