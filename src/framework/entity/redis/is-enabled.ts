import * as dotenv from "dotenv";
import API from "@/app";

export default () : boolean => {
    dotenv.config();
    
    let IsEnabled = parseInt((process.env.ENABLE_REDIS ?? "0")) === 1;
    let IsUnitTest = API.getUnitTest();

    return (IsUnitTest) ? false : IsEnabled;
};