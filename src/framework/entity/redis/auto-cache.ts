import { MakeHandlerOptions } from "@/core/types";
import { ExpressFormater, SetCache } from ".";
import express from "express";

export default (key: string, ResponseData: any, StatusCode: number, options?: MakeHandlerOptions) => {
    let CacheResponse = ExpressFormater(ResponseData, StatusCode);
    if (options?.useCache === true && key.length > 0) {
        SetCache(key, JSON.stringify(CacheResponse));
    }
}