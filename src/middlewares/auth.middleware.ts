import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors/app.error";
import { serverConfig } from "../config";

// Extend the Request type to include user information
interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    email: string;
  };
}

export const isAuthenticated = (
  req: AuthenticatedRequest,
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
    const decoded = jwt.verify(token, serverConfig.JWT_SECRET) as {
      _id: string;
      email: string;
    };

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};
