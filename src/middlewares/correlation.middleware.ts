import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { asyncLocalStorage } from "../utils/helpers/request.helper";
export const attachCorrelationIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correlationId = uuidv4();

  // approach 1 for adding correlation id
  // req.headers["X-Correlation-ID"] = correlationId;
  // res.setHeaders("X-Correlation-ID", correlationId);

  // approach 2 for adding correlation id
  asyncLocalStorage.run({ correlationId: correlationId }, () => {
    next();
  });
};
