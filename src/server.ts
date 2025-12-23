import express from "express";

import { serverConfig } from "./config/index";
import v1Router from "./routers/v1/index.router";
import v2Router from "./routers/v2/index.router";
import { genericErrorHandler } from "./middlewares/error.middleware";
import logger from "./config/logger";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.use(attachCorrelationIdMiddleware);

app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

// error handler
app.use(genericErrorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(serverConfig.DB_URL);
    logger.info("Connected to MongoDB", { name: "dev server" });

    app.listen(serverConfig.PORT, () => {
      logger.info(`Server is running at port ${serverConfig.PORT}`, {
        name: "dev server",
      });
    });
  } catch (error) {
    logger.error("Failed to connect to MongoDB", { error, name: "dev server" });
    process.exit(1); // exit if DB connection fails
  }
};

startServer();

app.listen(serverConfig.PORT, async () => {
  console.log(`Server is running at port ${serverConfig.PORT}.`);

  // console.log(`Press ctrl + c to stop the server.`);
  logger.info(`Press ctrl + c to stop the server  `, { name: "dev server" });
});
