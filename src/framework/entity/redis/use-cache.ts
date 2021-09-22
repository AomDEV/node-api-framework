import { FetchCache, FunctionFormater, SetCache } from ".";

export default async (handler: Function, ...params: any) => {
    const keyName = FunctionFormater(handler, ...params);
    const cacheResult = await FetchCache(keyName);
    if(cacheResult !== null) return cacheResult;
    let result = await handler(...params);
    SetCache(keyName, JSON.stringify(result));
    return result;
}