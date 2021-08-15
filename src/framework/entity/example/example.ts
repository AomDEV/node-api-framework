import {find} from "@/framework/database/example"
export default ()=>{
    const finder = new find();
    return {
        getAll: ()=>{
            return finder.findAll();
        },
        findData: (ID: number)=>{
            return finder.findBy({id: ID});
        }
    }
}