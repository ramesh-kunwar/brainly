import z from "zod/v3";
import tagModel from "../model/tag.model";

export const tagSchema = z.object({
  title: z
    .string({
      required_error: "Tag Title is required",
    })
    .trim()
    .refine(
      async (title) => {
        const exists = await tagModel.exists({ title });
        return !exists;
      },
      {
        message: "Tag must be unique",
      }
    ),
});
