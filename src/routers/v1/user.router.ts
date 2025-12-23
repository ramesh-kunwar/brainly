import express from "express";
import { signupUser } from "../../controllers/user.controller";
import { validateRequestBody } from "../../validators";
import { userSchema } from "../../validators/user.validator";

const userRouter = express.Router();

// pingRouter.get("/", validateRequestBody(pingSchema), pingHandler);
userRouter.post("/signup", validateRequestBody(userSchema), signupUser);

// pingRouter.get("/health", (req, res) => {
//   res.json({
//     msg: "OK",
//   });
// });

export default userRouter;
