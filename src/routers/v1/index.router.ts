import express from "express";
import pingRouter from "./ping.router";
import userRouter from "./user.router";
import contentRouter from "./content.router";
import tagsRouter from "./tags.router";

const v1Router = express.Router();

v1Router.use("/ping", pingRouter);
v1Router.use("/users", userRouter);
v1Router.use("/contents", contentRouter);
v1Router.use("/tags", tagsRouter);

export default v1Router;
