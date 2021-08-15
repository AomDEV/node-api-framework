import express from 'express'
import {exampleEntity} from '@/framework/entity/example'

export default async function (request: express.Request){
    return {
        callback: await exampleEntity().getAll()
    }
}