import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";
import { uploadImageMiddleware } from "../middleware/upload.middleware";

import {
  createSamplePack,
  getSamplePacks,
  getSamplePack,
  updateSamplePack,
  deleteSamplePack,
  getFilteredPacks,
  getSamplePackAudio, 
} from "../controller/sample-pack.controller";

const router = Router();

// PUBLIC FILTER ROUTE (No Auth Middleware needed because it's for the public Catalog)
router.get("/filter", getFilteredPacks); 

// PRIVATE BOARDING ROUTES
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  uploadImageMiddleware,
  createSamplePack
);

router.get(
  "/:id/audio",
  authMiddleware,
  getSamplePackAudio
);
router.get("/", authMiddleware, adminMiddleware, getSamplePacks);
router.get("/:id", getSamplePack);
router.put(
  "/:id", 
  authMiddleware, 
  adminMiddleware, 
  uploadImageMiddleware, 
  updateSamplePack
);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSamplePack);

export default router;