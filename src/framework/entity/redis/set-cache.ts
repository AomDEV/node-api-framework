import { Client, IsEnabled } from ".";
import * as dotenv from "dotenv";
import { cd } from "@/framework/entity/core";

export default (key: string, value: string, ttl?:number) => {
    dotenv.config();
    if (IsEnabled() === true && key.length > 0 && value.length > 0) {
        if (parseInt(process.env.REDIS_LOG ?? "0") === 1) cd(`Set "${key}" cache`);
        Client().set(key, value, ttl);
    }
}