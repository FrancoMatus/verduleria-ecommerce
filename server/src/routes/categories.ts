import { Router } from "express";

const router: Router = Router();

import {
  getAllCategories,
  createCategories,
} from "../controllers/categoriesController";

router.get("/all", getAllCategories);

router.post("/create", createCategories);

export default router;
