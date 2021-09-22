import { GetCache } from "@/framework/entity/redis";
import { cd } from "@/framework/entity/core";
import * as dotenv from "dotenv";

export default async (key:string) => {
    dotenv.config();
    let cache = await GetCache(key);
    if(cache){
        if (parseInt(process.env.REDIS_LOG ?? "0") === 1) cd(`Get "${key}" cache`);
        return JSON.parse(cache);
    }
    return null;
}