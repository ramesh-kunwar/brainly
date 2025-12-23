// this file contains all the configuration for the app server to work
import dotenv from "dotenv";

type ServerConfig = {
  PORT: number;
  DB_URL: string;
  SALT_ROUND: number;
  JWT_SECRET: string;
};
export function loadEnv() {
  dotenv.config();
}
loadEnv();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 4000,
  DB_URL: process.env.DB_URL!,
  SALT_ROUND: Number(process.env.SALT_Round),
  JWT_SECRET: String(process.env.JWT_SECRET),
};
