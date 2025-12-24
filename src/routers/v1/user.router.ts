import express from "express";
import { loginUser, signupUser } from "../../controllers/user.controller";
import { validateRequestBody } from "../../validators";
import { userSchema } from "../../validators/user.validator";

const userRouter = express.Router();

// pingRouter.get("/", validateRequestBody(pingSchema), pingHandler);
userRouter.post("/signup", validateRequestBody(userSchema), signupUser);
userRouter.post("/login", validateRequestBody(userSchema), loginUser);

// pingRouter.get("/health", (req, res) => {
//   res.json({
//     msg: "OK",
//   });
// });

export default userRouter;
