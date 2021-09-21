import express from 'express'
import {example} from '@/framework/entity/example'

export default async function (request: express.Request){
    return {
        callback: await example().CalculateTaxFee(100,7),
        user: request.user
    }
}