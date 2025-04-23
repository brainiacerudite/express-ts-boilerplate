import config from "@/config";
import HttpException from "@/exceptions/HttpException";
import ValidationException from "@/exceptions/ValidationException";
import { logger } from "@/utils/logger";
import { NextFunction, Request, Response } from "express";

const ErrorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";

    // handle validation exceptions
    if (err instanceof ValidationException) {
      const response: { success: boolean; message: string; errors?: any } = {
        success: false,
        message: err.message,
      };
      if (err.errors) {
        response.errors = err.errors;
      }
      res.status(status).json(response);
    }

    // handle logging only non-validation exceptions
    if (status !== 400 && status !== 422) {
      logger.error(
        `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`
      );
    }

    if (config.env !== "development" && status === 500) {
      res
        .status(status)
        .json({ success: false, message: "Internal server error" });
    }

    res.status(status).json({ success: true, message });
  } catch (error) {
    next(error);
  }
};

export default ErrorMiddleware;
