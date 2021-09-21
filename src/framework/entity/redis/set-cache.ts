import express from "express";
import { CacheName, Client } from ".";
import * as dotenv from "dotenv";

export default (request: express.Request, value: string, ttl?:number) => {
    dotenv.config();
    const cacheName = CacheName(request);
    if (parseInt((process.env.ENABLE_REDIS ?? "0")) === 1) 
        Client.set(cacheName, value, ttl);
}