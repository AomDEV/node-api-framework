import error from "@/core/express/error"
export default (errorMessage:string = "Internal server error")=>error(errorMessage);