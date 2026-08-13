import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";
import { uploadAudioMiddleware } from "../middleware/upload.middleware"; // <-- Import it here
import {
  createSample,
  getSamples,
  getSample,
  updateSample,
  deleteSample,
} from "../controller/sample.controller";

const router = Router();

router.post(
  "/", 
  authMiddleware, 
  adminMiddleware, 
  uploadAudioMiddleware, 
  createSample
);

router.get("/", authMiddleware, adminMiddleware, getSamples);
router.get("/:id", authMiddleware, adminMiddleware, getSample);

router.put(
  "/:id", 
  authMiddleware, 
  adminMiddleware, 
  uploadAudioMiddleware, 
  updateSample
);

router.delete("/:id", authMiddleware, adminMiddleware, deleteSample);

export default router;