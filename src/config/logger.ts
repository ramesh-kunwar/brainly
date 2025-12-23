import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { getcorrelationId } from "../utils/helpers/request.helper";

const logger = winston.createLogger({
  // level: "info",
  defaultMeta: { service: "app" },
  format: winston.format.combine(
    winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
    winston.format.json(),
    // define a custom print
    winston.format.printf(({ level, message, timestamp, ...data }) => {
      const output = {
        level,
        message,
        timestamp,
        correlationId: getcorrelationId(),
        data,
      };
      return JSON.stringify(output);
    })
  ),

  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "logs/%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export default logger;
