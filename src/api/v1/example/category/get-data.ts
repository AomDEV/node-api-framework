import express from 'express'
import {example} from '@/framework/entity/example'
import CustomError from '@/core/exception';
import { useCache } from '@/framework/entity/redis';

export default async function (request: express.Request){
    const {id} = request.params;
    if(isNaN(Number(id))) throw new CustomError("ID is not a numeric", 400);
    const parsed = parseInt(id);
    let callback = await useCache(example().CalculateTaxFee, parsed, 7);
    return {
        price: parsed,
        callback: callback
    }
}