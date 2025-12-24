import { NextFunction, Request, Response } from "express";
import tagModel from "../model/tag.model";
import contentModel from "../model/content.model";
import mongoose from "mongoose";
import { UnauthorizedError } from "../utils/errors/app.error";
import { AuthenticatedRequest } from "../types";

export const addContent = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { link, title, type, tagTitle } = req.body;

    // Find the tag if tagTitle is provided
    let tagId: mongoose.Types.ObjectId | undefined;
    if (tagTitle) {
      const tag = await tagModel.findOne({ title: tagTitle });
      if (tag) {
        tagId = tag._id;
      }
    }

    if (!req.user) {
      throw new UnauthorizedError();
    }
    const userId: string = req.user._id;

    const contentData: any = {
      title,
      link,
      type,
      userId,
    };

    if (tagId) {
      contentData.tags = tagId;
    }

    const content = await contentModel.create(contentData);

    res.status(201).json({
      success: true,
      message: "Content Added Successfully",
      data: content,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllContent = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const content = await contentModel.find().populate({ path: "tags" });
    res.status(201).json({
      success: true,
      message: "Content fetched successfully",
      count: content.length,
      data: content,
    });
  } catch (error) {
    next(error);
  }
};

export const getContentByID = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const content = await contentModel
      .findById(req.params.id)
      .populate({ path: "tags" });
    res.status(201).json({
      success: true,
      message: "Content fetched successfully",
      data: content,
    });
  } catch (error) {
    next(error);
  }
};
