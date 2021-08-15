import BaseDatabase from "@/core/database/base-database";

class Example extends BaseDatabase{
    public findAll(){
        return this.prisma.accounts.findMany();
    }
    public findBy(Query: any){
        return this.prisma.accounts.findMany({
            where: Query
        });
    }
}
export default Example;