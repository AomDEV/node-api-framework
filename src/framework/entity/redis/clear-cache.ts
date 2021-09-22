import { Client, IsEnabled } from ".";
import * as dotenv from "dotenv";

export default (key: string) => {
    dotenv.config();
    if (IsEnabled() === true) 
        return;
    Client().clear(key);
}