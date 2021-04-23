import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface PayloadInterface {
  id: string;
  iat: number;
  exp: number;
}

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json("Access denied");
  }
  const payload = jwt.verify(
    token,
    process.env.GENERATE_SECRET_KEY_TOKEN || "TRASH_TOKEN"
  ) as PayloadInterface;

  req.userId = payload.id;
  next();
};
