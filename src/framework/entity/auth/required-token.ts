import jwt from "express-jwt";
import { MiddlewareExceptionBuilder } from "@/framework/entity/core";

export default function(){
    return MiddlewareExceptionBuilder(jwt({ secret: process.env.JTW_SECRET || "SECRET", algorithms: ['HS256'] }));
}