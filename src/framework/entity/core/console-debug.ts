import API from '@/app';

export default (...params: any)=>{
    if(!API.getUnitTest()) 
        console.log(...params);
}