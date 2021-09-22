import express from 'express'
import {example} from '@/framework/entity/example'
import { useCache } from '@/framework/entity/redis'

export default async function (request: express.Request){
    let callback = await useCache(example().CalculateTaxFee, 100, 7);
    return {
        callback: callback,
        user: request.user
    }
}