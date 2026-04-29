import winston from "winston";
import { ENVIRONMENT } from "../../bootstrap/Envs";
import { ILogger } from "../domain/Logger";

const isProd = ENVIRONMENT !== 'dev'
const devFormat = winston.format.combine(
  winston.format.splat(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
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


export class WinstonLoggerAdapter implements ILogger {
  constructor(private readonly winston: winston.Logger){}

  debug(message: string, metadata: any): void {
    const metadataStringify = this.formatMetadata(metadata)
    this.winston.debug(this.formatMessage(message, metadataStringify))
  }

  info(message: string, metadata: any): void {
    const metadataStringify = this.formatMetadata(metadata)
    this.winston.info(this.formatMessage(message, metadataStringify))
  }

  error(message: string, metadata: any): void {
    const metadataStringify = this.formatMetadata(metadata)
    this.winston.error(this.formatMessage(message, metadataStringify))
  }

  warn(message: string, metadata: any): void {
    const metadataStringify = this.formatMetadata(metadata)
    this.winston.warn(this.formatMessage(message, metadataStringify))
  }

  private formatMetadata(metadata: any) {
    return typeof metadata === "object" ? JSON.stringify(metadata): metadata
  }

  private formatMessage(message:string, metadata: string) {
    return `${message}: ${metadata}`
  }
}


