import express from "express";
import { validateRequestBody } from "../../validators";
import { contentSchema } from "../../validators/content.validator";
import {
  addContent,
  getAllContent,
  getContentByID,
} from "../../controllers/content.controller";
import { isAuthenticated } from "../../middlewares/auth.middleware";

const contentRouter = express.Router();

contentRouter.post(
  "/",
  isAuthenticated,
  validateRequestBody(contentSchema),
  addContent
);

contentRouter.get("/", isAuthenticated, getAllContent);

contentRouter.get(
  "/:id",
  isAuthenticated,

  getContentByID
);
export default contentRouter;
