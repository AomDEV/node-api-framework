import express from 'express';
import error from '@/core/express/middleware/not-found'
import * as bodyParser from 'body-parser'

class Application{
    private _express : express.Express;
    private _port : any = 3000;
    private _routePath: string = "";
    private _apiVersion: string = "v1";
    private _overrideRoute: string = "#!";

    constructor(){
        this._express = express();
        this.RegisterMiddleware(bodyParser.json());
    }

    public SetRoutePath(Path: string){
        this._routePath = Path;
    }

    public SetApiVersion(Version: string){
        this._apiVersion = Version;
    }

    protected RegisterMiddleware(middleWare: any){
        this._express.use(middleWare);
    }

    protected RegisterRoute(Router : express.Router, Category: string = ""){
        const Prefix = (!Category.includes(this._overrideRoute)) ? `${this._routePath}${Category}` : Category.replace(this._overrideRoute, "");
        this._express.use(Prefix, Router);
    }

    protected PreSetup() {}

    protected async Setup() {}

    protected PostSetup() {
        this.RegisterRoute(error, `${this._overrideRoute}/`);
    }

    public async Start(PORT : number = 3000){
        this.PreSetup();
        this.Setup().then(()=>{
            this.PostSetup(); // Event delegate
            this._port = process.env.PORT || PORT;
            this._express.listen(this._port, ()=>console.log(`Server is listening on port ${this._port}`));
        });
    }

    get app () {
        return this._express;
    }

    get apiVersion(){
        return this._apiVersion;
    }

    protected set app (app) {
        this._express = app;
    }
}
export default Application;