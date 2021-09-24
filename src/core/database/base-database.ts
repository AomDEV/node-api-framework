import prisma from "@/core/database"; 
import CustomError from "@/core/exception";
import { PrismaPaginationHeader } from "@/core/types";

class BaseDatabase {
    protected prisma = prisma;
    
    public table(): any{
        return null;
    }
    public findAll(Options?: any){
        return this.table().findMany(Options);
    }
    public async findAllPagination(CurrentPage: number, Limit: number = 10, Options?: any){
        const page = CurrentPage || 1;
        const limit = Limit || 10;
        const startIndex = (page - 1) * limit;
        const totalCount = await this.table().count();
        const totalPage = Math.ceil(totalCount / limit);
        const currentPage = page || 0;
        const header: PrismaPaginationHeader = {totalCount:0, totalPage:0, currentPage:0, limit:0};
        let result: any[] = [];
        try{
            header.totalCount = totalCount;
            header.totalPage = totalPage;
            header.currentPage = currentPage;
            header.limit = limit;

            if(page <= 0 || page > totalPage) {
                throw new CustomError("Resource not found");
            } else{
                result = await this.table().findMany({
                    take: limit,
                    skip: startIndex,
                    ...Options
                });
            }
        } catch (err) {
            return {result, header};
        } finally{
            return {result, header};
        }
    }
    public findMany(Query: any, Options: any = null){
        return this.table().findMany({
            where: Query,
            ...Options
        });
    }
    public findUnique(Query: any, Options: any = null){
        return this.table().findUnique({
            where: Query,
            ...Options
        });
    }
    public insert(Data: any, Options: any = null){
        return this.table().create({
            data: Data,
            ...Options
        });
    }
    public insertMany(Data: [any], Options: any = null){
        return this.table().createMany({
            data: Data,
            ...Options
        });
    }
    public update(Query: any, Data: any, Options: any = null){
        return this.table().update({
            where: Query,
            data: Data,
            ...Options
        });
    }
    public updateMany(Query: any, Data: any, Options: any = null){
        return this.table().updateMany({
            where: Query,
            data: Data,
            ...Options
        });
    }
    public upsert(Query: any, UpdateData: any, CreateData: any, Options: any = null){
        return this.table().upsert({
            where: Query,
            update: UpdateData,
            create: CreateData,
            ...Options
        });
    }
    public delete(Query: any, Options: any = null){
        return this.table().delete({
            where: Query,
            ...Options
        });
    }
    public deleteMany(Query: any, Options: any = null){
        return this.table().deleteMany({
            where: Query,
            ...Options
        });
    }
    public truncate(){
        this.table().deleteMany();
    }
}
export default BaseDatabase;