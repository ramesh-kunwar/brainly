import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import { InternalServerError } from "../utils/errors/app.error";
import logger from "../config/logger";
export const pingHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("Ping request received. ");

  res.status(200).json({
    msg: "hello",
  });
};
