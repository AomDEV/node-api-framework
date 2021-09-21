import redis from "redis";
import * as dotenv from "dotenv";

const { promisify } = require('util');

dotenv.config();

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: parseInt((process.env.REDIS_PORT ?? "6379")),
    password: process.env.REDIS_PASSWORD
});

client.on('error', (err: any) => {
    console.log('Redis Error: ' + err);
});

const setAsyncEx = promisify(client.setex).bind(client);
const getAsync = promisify(client.get).bind(client);

async function set(key: string, value: string, ttlSeconds: number = 60) {
    if(key.length <= 0) return null;
    return await setAsyncEx(key, ttlSeconds, value); 
}
  
async function get(key: string) {
    if(key.length <= 0) return null;
    const data = await getAsync(key);
    if (data) return data;
    return null;
}

function clear(key: string){
    if(key.length <= 0) return null;
    return client.del(key);
}

function clearAll(){
    return client.flushall();
}

export {get, set, clear, clearAll};