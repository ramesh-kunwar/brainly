import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/app.error";

export const genericErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //
  const statusCode = err.statusCode || 500; // fallback to 500

  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};
