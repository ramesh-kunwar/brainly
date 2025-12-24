import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model";
import {
  DuplicateEmailError,
  InvalidCredentialsError,
  UserNotFoundError,
} from "../utils/errors/app.error";
import { serverConfig } from "../config";

export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    throw new DuplicateEmailError();
  }

  const hashedPassword = await bcrypt.hash(password, serverConfig.SALT_ROUND);

  const token = jwt.sign({ email }, serverConfig.JWT_SECRET, {
    expiresIn: "10d",
  });

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const statusCode = 201;
  return res.status(statusCode).json({
    success: true,

    msg: "User registered successfully",
    data: user.id,
    token,
  });
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //

  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    throw new UserNotFoundError();
  }

  const isMatchedPassword = await bcrypt.compare(password, user.password);

  if (!user || !isMatchedPassword) {
    throw new InvalidCredentialsError();
  }

  const token = jwt.sign({ email }, serverConfig.JWT_SECRET, {
    expiresIn: "10d",
  });

  const statusCode = 200;
  return res.status(statusCode).json({
    success: true,

    msg: "User Logged in successfully",
    data: user.id,
    token,
  });
};
