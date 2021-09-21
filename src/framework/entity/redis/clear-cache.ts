import express from "express";
import { CacheName, Client } from ".";
import * as dotenv from "dotenv";

export default (request: express.Request) => {
    dotenv.config();
    if (parseInt((process.env.ENABLE_REDIS ?? "0")) === 1) 
        return;
    let cacheName = CacheName(request);
    Client.clear(cacheName);
}