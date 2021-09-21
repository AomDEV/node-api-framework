import { MakeHandlerOptions, RedisCacheResponse } from "@/core/types";
import express from "express";
import { GetCache } from "@/framework/entity/redis";

export default async (request:express.Request, response: express.Response, options?: MakeHandlerOptions) => {
    if(options?.useCache === true) {
        let cache = await GetCache(request);
        if(cache){
            let parsedCache: RedisCacheResponse = JSON.parse(cache);
            response.status(parsedCache.code);
            response.json(parsedCache.data);
            return true;
        }
    };
    return false;
}