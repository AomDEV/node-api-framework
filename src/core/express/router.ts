import express from "express"
import { ExpressHandler } from "@/core/types";
import { DebugError, ExceptionBuilder, IsOverridedStatus } from "@/framework/entity/core";
import * as dotenv from "dotenv";

export const makeHandler = function (Handler: Function) : ExpressHandler{
    dotenv.config();
    return async function(request: express.Request, response: express.Response){
        var Status = false;
        var Result = null;
        var exceptionResponse = null;
        try{
            Result = await Handler(request);
            let IsResultOverrideStatus = IsOverridedStatus(Result);
            Status = (typeof Result === 'boolean' || IsResultOverrideStatus) ? Result : true;
            if(Result !== null) delete Result.status;
        } catch (ex){
            const { exception, errorCode } = ExceptionBuilder(ex);
            exceptionResponse = exception;
            response.status(errorCode);
            DebugError(ex as Error);
        } finally{
            response.json(exceptionResponse || {status: Status, data: Result});
        }
    };
};
