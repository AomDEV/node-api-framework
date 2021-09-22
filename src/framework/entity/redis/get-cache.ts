import { Client, IsEnabled } from ".";
import * as dotenv from "dotenv";

export default (key: string) => {
    dotenv.config();
    if (IsEnabled() === true && key.length > 0) 
        return Client().get(key);
    return null;
}