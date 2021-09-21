import { MakeHandlerOptions, RedisCacheResponse } from "@/core/types";
import express from "express";
import { CacheName, GetCache } from "@/framework/entity/redis";

export default async (request:express.Request, response: express.Response, options?: MakeHandlerOptions) => {
    if(options?.useCache === true) {
        let key = CacheName(request);
        let cache = await GetCache(key);
        if(cache){
            let parsedCache: RedisCacheResponse = JSON.parse(cache);
            response.status(parsedCache.code);
            response.json(parsedCache.data);
            return true;
        }
    };
    return false;
}