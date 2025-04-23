import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  skipSuccessfulRequests: true, // skip successful requests
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const RateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  rateLimiter(req, res, next);
};

export default RateLimiterMiddleware;
