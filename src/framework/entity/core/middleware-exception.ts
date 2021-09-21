import CustomError from "@/core/exception";
import { ExpressMiddleware } from "@/core/types/core";
import express from "express";
import ExceptionBuilder from "./exception-builder";

export default function (middleware: ExpressMiddleware){
    return async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try{
            const secureNext: express.NextFunction = (error?: any) => {
                if(error && error instanceof Error) throw error;
                next(error);
            };
            await middleware(request, response, secureNext);
        } catch (ex) {
            const {exception, errorCode} = ExceptionBuilder(ex);
            response.status(errorCode);
            response.json(exception);
        }
    }
}