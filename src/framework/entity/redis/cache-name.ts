import express from "express";
import * as dotenv from "dotenv";

export default (request: express.Request) : string => {
    dotenv.config();
    let IsEnabledRedis = parseInt((process.env.ENABLE_REDIS ?? "0"));
    if (IsEnabledRedis !== 1) 
        return "";
    return "test";
}