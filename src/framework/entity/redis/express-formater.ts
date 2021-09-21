import { RedisCacheResponse } from "@/core/types"

export default (response: any, statusCode: number) : RedisCacheResponse => {
    return {
        data: response,
        code: statusCode
    };
}