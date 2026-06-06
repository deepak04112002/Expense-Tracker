import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PUBLIC_KEY } from "../config";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_PUBLIC_KEY) as { sub?: string };
    if (!decoded?.sub) return res.status(401).json({ message: "Unauthorized" });

    req.userId = decoded.sub;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
