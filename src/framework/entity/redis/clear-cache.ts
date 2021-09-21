import express from "express";
import { CacheName, Client } from ".";
import * as dotenv from "dotenv";

export default (key: string) => {
    dotenv.config();
    if (parseInt((process.env.ENABLE_REDIS ?? "0")) === 1) 
        return;
    Client.clear(key);
}