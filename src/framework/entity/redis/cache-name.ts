import express from "express";
import * as dotenv from "dotenv";

export default (request: express.Request) : string => {
    dotenv.config();
    if (parseInt((process.env.ENABLE_REDIS ?? "0")) === 1) 
        return "";
    return "test";
}