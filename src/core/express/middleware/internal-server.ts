import middleware from "@/core/express/middleware"
import internalServer from "@/core/express/error/internal-server";
export default middleware(function(request: Express.Request, setStatus: Function) {
    setStatus(500);
    return internalServer;
});