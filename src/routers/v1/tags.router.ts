import express from "express";
import { validateRequestBody } from "../../validators";
import { isAuthenticated } from "../../middlewares/auth.middleware";
import { tagSchema } from "../../validators/tag.validator";
import { createTags, getAllTags } from "../../controllers/tags.controller";

const tagsRouter = express.Router();

tagsRouter.post(
  "/",
  isAuthenticated,
  validateRequestBody(tagSchema),
  createTags
);

tagsRouter.get("/", getAllTags);

export default tagsRouter;
