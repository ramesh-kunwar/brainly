import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors/app.error";
import { serverConfig } from "../config";
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError();
  }

  const token = authHeader.split(" ")[1] as string;

  try {
    const decoded = jwt.verify(token, serverConfig.JWT_SECRET);

    //@ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};
