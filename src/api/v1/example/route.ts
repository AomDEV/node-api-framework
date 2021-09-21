import {makeHandler} from "@/core/express/router";
import express from "express"
import {RequiredToken} from "@/framework/entity/auth"
import getData from "@/api/v1/example/category/get-data";
import getAll from "./category/get-all";
const router = express.Router();

//router.use(RequiredToken());
router.get('/something', makeHandler(getAll, {useCache:true}));
router.get('/something/:id', makeHandler(getData, {useCache:true}));

export default router;