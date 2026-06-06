import type { Request, Response, NextFunction } from "express";
import rateLimit from "../config/upstash.js";


const limiter = rateLimit(); // instantiate once

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const identifier = req.ip || "anonymous";
    const { success } = await limiter.limit(identifier);
    if (!success) return res.status(429).json({ message: "Too Many Requests" });
    next();
  } catch (error) {
    console.log("Rate Limit Error", error);
    next(error);
  }
}
