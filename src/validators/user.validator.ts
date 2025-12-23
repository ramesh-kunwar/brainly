import z from "zod/v3";

export const userSchema = z.object({
  username: z.string({ required_error: "username is required" }).min(1),
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Provide correct email" }),
  password: z.string({ required_error: "Password is required" }),
});
