import BaseDatabase from "@/core/database/base-database";

class Example extends BaseDatabase{
    
    public table(): any{
        return this.prisma.example;
    }

}
export default new Example;