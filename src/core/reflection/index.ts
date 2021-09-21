const { resolve } = require('path');
const { readdir } = require('fs').promises;

class Reflection {
    private async getFiles(Directory: string, Recursive : boolean = true, Flag: number = 0) {
      const dirents = await readdir(Directory, { withFileTypes: true });
      const files = await Promise.all(dirents.map((dirent: any) => {
        const res = resolve(Directory, dirent.name);
        if(Recursive){
          return dirent.isDirectory() ? this.getFiles(res) : res;
        } else{
          if(dirent.isDirectory() && Flag == 0) {
            return this.getFiles(res, false, -1);
          } else{
            return res;
          }
        }
      }));
      return Array.prototype.concat(...files);
    }

    public async SearchFile(Folder: string, Extension: string, Recursive: boolean = true){
      const Files = await this.getFiles(Folder, Recursive);
      const Libraries = Files.filter(x=>x.includes(Extension));
      return Libraries;
    }

    public async SearchRouter(Path: string){
      try{
        const baseIndex :string = "route.ts";
        return (await this.SearchFile(Path, baseIndex, false)).map((x:string)=>{
          var Directories = x.replace(`\\${baseIndex}`,"").split("\\");
          var TrashIndex = 0;
          for(let i = 0; i < Directories.length; i++){
            TrashIndex = i + 1;
            if (Directories[i] === 'src') break;
          }
          Directories.splice(0, TrashIndex);
          var ImportPath = `@/${Directories.join('/')}/${baseIndex}`;
          var Result = {
            path: ImportPath,
            category: (Directories.length <= 0)? "" : `/${Directories[Directories.length - 1]}`,
            router: require(ImportPath).default
          }
          return Result;
        });
      } catch (ex){ return []; }
    }
}
export default Reflection;