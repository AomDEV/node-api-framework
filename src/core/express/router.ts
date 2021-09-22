import express from "express"
import { DebugError, ExceptionBuilder, IsOverridedStatus } from "@/framework/entity/core";
import { ExpressHandler } from "@/core/types";

export const makeHandler = function (Handler: Function) : ExpressHandler{
    return async function(request: express.Request, response: express.Response){
        var Status = false;
        var Result = null;
        var exceptionResponse = null;
        var statusCode = 200;
        try{
            Result = await Handler(request);
            let IsResultOverrideStatus = IsOverridedStatus(Result);
            Status = (typeof Result === 'boolean' || IsResultOverrideStatus) ? Result : true;
            if(Result !== null) delete Result.status;
        } catch (ex){
            const { exception, errorCode } = ExceptionBuilder(ex);
            exceptionResponse = exception;
            statusCode = errorCode;
            response.status(errorCode);
            DebugError(ex as Error);
        } finally{
            let ResponseData = exceptionResponse || {status: Status, data: Result};
            response.json(ResponseData);
        }
    };
};
