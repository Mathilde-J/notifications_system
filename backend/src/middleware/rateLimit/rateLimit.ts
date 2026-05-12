import { rateLimit } from "express-rate-limit";

// 100 / 15 minutes
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: { message: "Too many requests, please try again later." },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
