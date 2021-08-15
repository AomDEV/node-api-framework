import express from "express"

export default function(delegate: Function){
    const router = express.Router();
    router.use(async function(request, response, next) {
        var setStatus = (code: number)=>response.status(code);
        var Result = await delegate(request, setStatus);
        response.json(Result || {status:false, message: "Something went wrong"});
    });
    return router;
};