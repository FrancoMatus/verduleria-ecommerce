import { Router } from "express";
import { tokenValidation } from "../libs/validateToken";

const router: Router = Router();

import { signIn, signUp, profile } from "../controllers/authController";

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/profile", tokenValidation, profile);

export default router;
