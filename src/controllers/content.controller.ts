import { NextFunction, Request, Response } from "express";
import tagModel from "../model/tag.model";
import contentModel from "../model/content.model";

export const addContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //
  const { link, title, type, tags } = req.body;

  const content = await contentModel.create({
    title,
    link,
    type,
    tags,
  });

  res.json({
    success: true,
    messge: "Content Added Successfully",
    data: content,
  });
};
