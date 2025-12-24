import { NextFunction, Request, Response } from "express";
import tagModel from "../model/tag.model";
import { DuplicateTagsError } from "../utils/errors/app.error";

export const createTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.body;
  const existingTags = await tagModel.findOne({ title });

  if (existingTags) {
    throw new DuplicateTagsError();
  }

  const tags = await tagModel.create({
    title,
  });

  res.status(201).json({
    message: "Tags created successfully",
    data: tags,
  });
};

export const getAllTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tags = await tagModel.find();

  res.status(201).json({
    message: "Tags fetched successfully",
    data: tags,
  });
};
