import prisma from "@/core/database"
class BaseDatabase {
    protected prisma;
    constructor(){
        this.prisma = prisma;
    }
}
export default BaseDatabase;