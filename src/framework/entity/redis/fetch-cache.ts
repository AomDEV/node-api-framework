import { GetCache } from "@/framework/entity/redis";
import * as dotenv from "dotenv";

export default async (key:string) => {
    dotenv.config();
    let cache = await GetCache(key);
    if(cache){
        if (parseInt(process.env.REDIS_LOG ?? "0") === 1) console.log(`Get "${key}" cache`);
        return JSON.parse(cache);
    }
    return null;
}