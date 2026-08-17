import { Router } from "express";
import {
  getCategories,
  getSampleTypes,
  getGenres,
} from "../controller/filter.controller";

const router = Router();

router.get("/categories", getCategories);
router.get("/sample-types", getSampleTypes);
router.get("/genres", getGenres);

export default router;