import { Router } from "express";

const router: Router = Router();

import {
  getAllProducts,
  createProduct,
  deleteProduct,
} from "../controllers/productController";

router.get("/all", getAllProducts);

router.post("/create", createProduct);

router.delete("/delete/:id", deleteProduct);

export default router;
