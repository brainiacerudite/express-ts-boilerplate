import HttpException from "@/exceptions/HttpException";
import { NextFunction, Request, Response } from "express";

const RouteNotFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new HttpException(404, "Route not found");
  next(error);
};

export default RouteNotFoundMiddleware;
