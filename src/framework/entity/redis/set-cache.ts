import { Client } from ".";
import * as dotenv from "dotenv";

export default (key: string, value: string, ttl?:number) => {
    dotenv.config();
    if (parseInt((process.env.ENABLE_REDIS ?? "0")) === 1 && key.length > 0) {
        if (parseInt(process.env.REDIS_LOG ?? "0") === 1) console.log(`Set "${key}" cache`);
        Client.set(key, value, ttl);
    }
}