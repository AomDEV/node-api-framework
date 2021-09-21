import express from "express";
import { CacheName, Client } from ".";
import * as dotenv from "dotenv";

export default (key: string, value: string, ttl?:number) => {
    dotenv.config();
    if (parseInt((process.env.ENABLE_REDIS ?? "0")) === 1 && key.length > 0) {
        Client.set(key, value, ttl);
    }
}