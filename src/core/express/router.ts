import express from "express"
import CustomError from "@/core/exception";
import ErrorBuilder from "@/core/express/error"
import internalServer from "./error/internal-server";

export const makeHandler = function (Handler: Function){
    return async function(request: express.Request, response: express.Response){
        var Status = false;
        var Result = null;
        var exception;
        try{
            Result = await Handler(request);
            Status = true;
        } catch (ex){
            var IsCustomError = ex instanceof CustomError;
            exception = (IsCustomError) ? ErrorBuilder(ex.message, ex.errorCode) : internalServer;
        } finally{
            response.json(exception || {status: Status, data: Result});
        }
    };
};
