export default (handler: Function, ...params:any)=>{
    const handlerName = handler.name;
    const handlerParams = `(${params.join(',')})`;
    return `${handlerName}${handlerParams}`;
}