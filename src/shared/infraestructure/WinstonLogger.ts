import winston from "winston";
import { ENVIRONMENT } from "../../bootstrap/Envs";

const isProd = ENVIRONMENT !== 'dev'
const devFormat = winston.format.combine(
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    const metaString = Object.keys(meta).length
      ? JSON.stringify(meta)
      : "";

    return `[${timestamp}] ${level}: ${message} ${metaString}`;
  })
)
const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
)


export const winstonLogger = winston.createLogger({
  level: 'info',
  format: isProd ? prodFormat : devFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/app.log" })
  ],
})


