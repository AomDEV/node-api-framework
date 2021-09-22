import CustomError from "@/core/exception";
import ErrorBuilder from "@/core/express/error";
import internalServer from "@/core/express/error/internal-server";

export default function(ex: any){
    var exception = {status:false, message: "Something went wrong"};
    var errorCode = 500;
    var InstanceName = ex.constructor.name ?? "Error";
    var IsCustomError = ex instanceof CustomError;
    if(IsCustomError){
        let cError: CustomError = ex as CustomError;
        exception = ErrorBuilder(cError.message);
        errorCode = cError.errorCode;
    } else if(InstanceName.indexOf('Unauthorized') !== -1){
        exception = ErrorBuilder(ex.message);
        errorCode = 401;
    } else{
        exception = internalServer();
        errorCode = 500;
    }
    return {exception, errorCode};
}