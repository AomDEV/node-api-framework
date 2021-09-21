import express from "express"
import { ExpressHandler } from "@/core/types";
import { ExceptionBuilder, IsOverridedStatus } from "@/framework/entity/core";
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
            var ProductionEnvironment = parseInt(process.env.PRODUCTION_ENVIRONMENT ?? "0");
            if(ProductionEnvironment === 0) throw ex;
            const { exception, errorCode } = ExceptionBuilder(ex);
            exceptionResponse = exception;
            response.status(errorCode);
        } finally{
            response.json(exceptionResponse || {status: Status, data: Result});
        }
    };
};
