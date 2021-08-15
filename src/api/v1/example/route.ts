import {makeHandler} from "@/core/express/router";
import express from "express"
import getData from "@/api/v1/example/category/get-data";
import getAll from "./category/get-all";
const router = express.Router();

router.get('/something', makeHandler(getAll));
router.get('/something/:id', makeHandler(getData));

export default router;