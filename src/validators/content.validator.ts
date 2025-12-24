import z from "zod/v3";
export const contentTypes = ["image", "video", "article", "audio"] as const;

export const contentSchema = z.object({
  link: z
    .string({
      required_error: "username is required",
    })
    .min(1),
  title: z.string({ required_error: "Content Title is required." }),

  type: z.enum(contentTypes, {
    required_error: "Content Type is required",
  }),
  userId: z.string(),
  tags: z.string(),
});
