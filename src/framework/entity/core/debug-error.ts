import CustomError from "@/core/exception";

export default function(ex: Error){
    var ProductionEnvironment = parseInt(process.env.PRODUCTION_ENVIRONMENT ?? "0");
    var DebugError = parseInt(process.env.DEBUG_ERROR ?? "0");
    if(ProductionEnvironment === 0 && DebugError === 1 && !(ex instanceof CustomError)) throw ex;
}