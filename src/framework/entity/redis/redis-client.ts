import redis from "redis";
import * as dotenv from "dotenv";
import { IsEnabled } from "@/framework/entity/redis"
import { cd } from "@/framework/entity/core";

export default () => {
    const { promisify } = require('util');

    dotenv.config();
    
    let localClient = null;
    if (IsEnabled() === true) {
        localClient = redis.createClient({
            host: process.env.REDIS_HOST,
            port: parseInt((process.env.REDIS_PORT ?? "6379")),
            password: process.env.REDIS_PASSWORD
        });
    
        localClient.on('error', (err: any) => {
            cd('Redis Error: ' + err);
        });
    }
    const client = localClient;
    
    const setAsyncEx = (client) ? promisify(client.setex).bind(client) : ()=>{};
    const getAsync = (client) ? promisify(client.get).bind(client) : ()=>{};
    
    async function set(key: string, value: string, ttlSeconds: number = 60) {
        if(key.length <= 0 || client === null) return null;
        return await setAsyncEx(key, ttlSeconds, value); 
    }
      
    async function get(key: string) {
        if(key.length <= 0 || client === null) return null;
        const data = await getAsync(key);
        if (data) return data;
        return null;
    }
    
    function clear(key: string){
        if(key.length <= 0 || client === null) return null;
        return client.del(key);
    }
    
    function clearAll(){
        if(client === null) return null;
        return client.flushall();
    }
    
    function close(){
        if(client === null) return;
        client.quit();
    }
    return {client, get, set, clear, clearAll, close};
};