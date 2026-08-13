import { Router } from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {adminMiddleware} from "../middleware/admin.middleware";

import {
  createSamplePack,
  getSamplePacks,
  getSamplePack,
  updateSamplePack,
  deleteSamplePack,
} from "../controller/sample-pack.controller";

const router = Router();



router.post("/", authMiddleware, adminMiddleware, createSamplePack);
router.get("/", authMiddleware, adminMiddleware, getSamplePacks);
router.get("/:id", authMiddleware, adminMiddleware, getSamplePack);
router.put("/:id", authMiddleware, adminMiddleware, updateSamplePack);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSamplePack);

export default router;