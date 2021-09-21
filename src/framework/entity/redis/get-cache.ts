import express from "express";
import { CacheName, Client } from ".";
import * as dotenv from "dotenv";

export default (key: string) => {
    dotenv.config();
    if (parseInt((process.env.ENABLE_REDIS ?? "0")) === 1 && key.length > 0) 
        return Client.get(key);
    return null;
}