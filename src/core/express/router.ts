import express from "express"
import { DebugError, ExceptionBuilder, IsOverridedStatus } from "@/framework/entity/core";
import { ClearCache, ExpressFormater, SetCache, AutoResponse, AutoCache } from "@/framework/entity/redis";
import { MakeHandlerOptions, ExpressHandler } from "@/core/types";

export const makeHandler = function (Handler: Function, options?: MakeHandlerOptions) : ExpressHandler{
    return async function(request: express.Request, response: express.Response){
        if(options === null) ClearCache(request);
        // Cache Reader
        let autoResponseResult = await AutoResponse(request, response, options);
        if(autoResponseResult) return;

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
            AutoCache(request, ResponseData, statusCode, options);
            response.json(ResponseData);
        }
    };
};
