import express from 'express';
import error from '@/core/express/middleware/not-found'
import * as bodyParser from 'body-parser';
import * as dotenv from "dotenv";
import { Server } from 'http';

class Application{
    private _express : express.Express;
    private _port : any = 3000;
    private _routePath: string = "";
    private _apiVersion: string = "v1";
    private _overrideRoute: string = "#!";
    private _routes: any[] = [];
    private _unitTest: boolean = false;
    private _listener: Server = new Server;

    constructor(){
        this._express = express();
        this.RegisterMiddleware(bodyParser.json());
        dotenv.config();
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

    private Separator(){
        if (!this._unitTest) console.log(`==========================================`);
    }

    private RenderRoutes(){
        var Table = require('cli-table');
        var table = new Table({ head: ["Method", "Path"] });

        this.Separator();
    
        for(var routes of this._routes){
            for (var key in routes.stacks) {
                if (routes.stacks.hasOwnProperty(key)) {
                    var val = routes.stacks[key];
                    if(val.route) {
                        val = val.route;
                        var _o:any = {};
                        _o[val.stack[0].method.toUpperCase()]  = [routes.prefix + val.path];    
                        table.push(_o);
                    }       
                }
            }
        }
        console.log(table.toString());
        return table;
    }

    protected RegisterRoute(Router : express.Router, Category: string = ""){
        const Prefix = (!Category.includes(this._overrideRoute)) ? `${this._routePath}${Category}` : Category.replace(this._overrideRoute, "");
        this._routes.push({prefix: Prefix, stacks:Router.stack});
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
            this._listener = this._express.listen(this._port, ()=>{
                var ProductionEnvironment = parseInt(process.env.PRODUCTION_ENVIRONMENT ?? "0");
                if (!this._unitTest) {
                    this.Separator();
                    console.log(`Port: ${this._port}`);
                    console.log(`Environment: ${ProductionEnvironment === 1 ? "PRODUCTION" : "DEBUG"}`);
                    console.log(`API Version: ${process.env.API_VERSION}`);
                    this.Separator();
                    console.log(`Server is listening on port ${this._port}\n`);
                }
            });
            if (!this._unitTest) this.RenderRoutes();
        });
    }

    get apiVersion(){
        return this._apiVersion;
    }

    public unitTest() : express.Express{
        this._unitTest = true;
        return this._express;
    }

    public getServer() : Server{
        return this._listener;
    }
}
export default Application;