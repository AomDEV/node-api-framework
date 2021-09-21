import middleware from "@/core/express/custom-middleware"
import notFound from "@/core/express/error/not-found";
export default middleware(function(request: Express.Request, setStatus: Function) {
    setStatus(404);
    return notFound;
});