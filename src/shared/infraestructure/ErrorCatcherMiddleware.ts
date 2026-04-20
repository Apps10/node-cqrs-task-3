import { NextFunction, Request, Response } from "express";
import { InternalError } from "../domain/InternalError";
import { BaseDomainError } from "../domain/DomainError";
import { winstonLogger as Logger } from "./WinstonLogger";
import { SentryClient } from "./SentryClient";

export class ErrorCatcherMiddleware {

  static catch(err:any, req:Request, res:Response, next:NextFunction) {

    if(err instanceof InternalError) {
      Logger.error("💥 Error:", err);
    }
    
    if(err instanceof BaseDomainError){
      return res.status(err.httpStatus).json({
        error: err.message,
      });
    }

    SentryClient?.captureException(err)
    return res.status(500).json({
        error: "Internal Server Error"
    });
  }
}