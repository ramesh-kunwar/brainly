import express from "express";
import { validateRequestBody } from "../../validators";
import { contentSchema } from "../../validators/content.validator";
import { addContent } from "../../controllers/content.controller";
import { isAuthenticated } from "../../middlewares/auth.middleware";

const contentRouter = express.Router();

contentRouter.post(
  "/",
  isAuthenticated,
  validateRequestBody(contentSchema),
  addContent
);

export default contentRouter;
