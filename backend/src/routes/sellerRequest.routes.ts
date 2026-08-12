import { Router } from "express";
import { createSellerRequest } from "../controller/sellerRequest.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createSellerRequest
);

export default router;