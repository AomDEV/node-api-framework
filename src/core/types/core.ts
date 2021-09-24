import express from 'express';
type ExpressHandler = (request: express.Request, response: express.Response) => Promise<void>;
type ExpressMiddleware = (request: express.Request, response: express.Response, next: express.NextFunction) => void;
type RedisOptions = {ttl?:number, name?:string};
type MakeHandlerOptions = {useCache?:boolean,redis?:RedisOptions};
type RedisCacheResponse = {data:any, code:number};
type PrismaPaginationHeader = {totalCount: number, totalPage: number, currentPage: number, limit: number};

export {ExpressHandler, ExpressMiddleware, MakeHandlerOptions, RedisCacheResponse, PrismaPaginationHeader};