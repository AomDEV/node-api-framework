import express from "express";
import { ExceptionBuilder, IsOverridedStatus } from "@/framework/entity/core";

export default function(delegate: Function){
    const router = express.Router();
    router.use(async function(request, response, next) {
        try{
            var setStatus = (code: number)=>response.status(code);
            var Result = await delegate(request, setStatus);
            let IsResultOverrideStatus = IsOverridedStatus(Result);
            if(Result === true || (IsResultOverrideStatus && Result.status === true)) {
                next();
                return;
            }
            response.status(500);
            response.json(Result || {status:false, message: "Something went wrong"});
        } catch(ex){
            const { exception, errorCode } = ExceptionBuilder(ex);
            response.status(errorCode);
            response.json(exception);
        }
    });
    return router;
};