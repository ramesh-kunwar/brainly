import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod/v3";
import logger from "../config/logger";

/**
 *
 * @param schema  - zod schema to validate the request body
 * @returns  - middleware function to validate the request body
 */

export const validateRequestBody = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("Validating request body ");
      await schema.parseAsync(req.body);

      next();
    } catch (error) {
      // if validation fails
      logger.info("Request body is invalid. ");
      if (error instanceof ZodError) {
        logger.info("Request body is invalid.");
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({
          success: false,
          message: "Invalid request body",
          errors: formattedErrors,
        });
      }
      // res.status(400).json({
      //   success: false,
      //   message:  "Invalid request body",
      // });
    }
  };
};

export const validateQueryParams = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.query);
      next();
    } catch (error) {
      // if validation fails
      res.status(400).json({
        success: false,
        message: "invalid query params",
      });
    }
  };
};
