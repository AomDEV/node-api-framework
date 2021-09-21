import express from 'express';
type ExpressHandler = (request: express.Request, response: express.Response) => Promise<void>;
type ExpressMiddleware = (request: express.Request, response: express.Response, next: express.NextFunction) => void;

export {ExpressHandler, ExpressMiddleware};