import { PrismaClient } from ".prisma/client";
import prisma from "@/core/database"; 

class BaseDatabase {
    protected prisma = prisma;
    
    public table(): any{
        return null;
    }

    public findAll(){
        return this.table().findMany();
    }
    public findBy(Query: any, Options: any = null){
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
        this.table().deleteMany({});
    }
}
export default BaseDatabase;