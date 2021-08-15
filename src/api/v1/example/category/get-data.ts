import express from 'express'
import {exampleEntity} from '@/framework/entity/example'
import CustomError from '@/core/exception';

export default async function (request: express.Request){
    const {id} = request.params;
    if(isNaN(Number(id))) throw new CustomError("ID is not a numeric", 400);
    const parsed = parseInt(id);
    return {
        id: parsed,
        callback: await exampleEntity().findData(parsed)
    }
}