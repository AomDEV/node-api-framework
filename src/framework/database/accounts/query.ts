import BaseDatabase from "@/core/database/base-database";

class Accounts extends BaseDatabase{
    
    public table(): any{
        return this.prisma.accounts;
    }

}
export default new Accounts;