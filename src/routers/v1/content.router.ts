import express from "express";
import { validateRequestBody } from "../../validators";
import { contentSchema } from "../../validators/content.validator";
import {
  addContent,
  getAllContent,
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
export default contentRouter;
