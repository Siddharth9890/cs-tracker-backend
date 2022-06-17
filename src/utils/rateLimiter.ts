import rateLimiter from "express-rate-limit";
import { Request, Response, NextFunction } from "express";

export const limiter = rateLimiter({
  max: 30, // limit each ip to 30 request per window(1 minute)
  windowMs: 1 * 60 * 1000, // 1 minute
  standardHeaders: true,
  legacyHeaders: false,
  handler: function (req: Request, res: Response, next: NextFunction) {
    return res.status(429).json({
      error:
        "You sent too many requests. Please wait for a minute then try again",
    });
  },
});
