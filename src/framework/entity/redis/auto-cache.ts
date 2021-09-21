import { MakeHandlerOptions } from "@/core/types";
import { ExpressFormater, SetCache } from ".";
import express from "express";

export default (request: express.Request, ResponseData: any, StatusCode: number, options?: MakeHandlerOptions) => {
    let CacheResponse = ExpressFormater(ResponseData, StatusCode);
    if (options?.useCache === true) {
        SetCache(request, JSON.stringify(CacheResponse));
    }
}