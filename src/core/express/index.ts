import express from 'express';
import error from '@/core/express/middleware/not-found'
import * as bodyParser from 'body-parser';
import * as dotenv from "dotenv";
import { Server } from 'http';
import { cd } from "@/framework/entity/core";
import { Client } from "@/framework/entity/redis";
import * as Databases from "@/framework/database";
import cluster from 'cluster';
import { cpus } from 'os';

class Application{
    private _express : express.Express;
    private _port : any = 3000;
    private _routePath: string = "";
    private _apiVersion: string = "v1";
    private _overrideRoute: string = "#!";
    private _routes: any[] = [];
    private _unitTest: boolean = false;
    private _listener: Server = new Server;
    private _workers: number = 0;

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
        if (!this._unitTest) cd(`==========================================`);
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
        cd(table.toString());
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

    public IsClusterEnabled(){
        return process.env.SELF_CLUSTER === '1' && !this.getUnitTest();
    }

    private ClusterType(){
        return (this.IsClusterEnabled()) ? ((cluster.isMaster) ? "Primary" : "Worker") : "Master";
    }

    private RenderInfo(){
        if (!this._unitTest && cluster.isMaster) {
            const numCPUs = cpus().length;
            const ProductionEnvironment = parseInt(process.env.PRODUCTION_ENVIRONMENT ?? "0");
            this.RenderRoutes();
            this.Separator();
            cd(`Port: ${this._port}`);
            cd(`Environment: ${ProductionEnvironment === 1 ? "PRODUCTION" : "DEBUG"}`);
            cd(`Cluster Mode: ${this.IsClusterEnabled() ? "Enabled" : "Disabled"}`);
            cd(`Cluster Type: ${this.ClusterType()}`);
            cd(`Number of CPUs: ${numCPUs}`);
            cd(`API Version: ${process.env.API_VERSION}`);
            this.Separator();
            //cd(`Server is listening on port ${this._port}\n`);
        }
    }

    public async Start(PORT : number = 3000){
        this.PreSetup();
        this.Setup().then(()=>{
            const numCPUs = cpus().length;
            this.PostSetup(); // Event delegate

            // Cluster Configuration
            if(this.IsClusterEnabled()) {
                if(cluster.isMaster){
                    for (var i = 0; i < numCPUs; i++) cluster.fork();
                    cluster.on('exit', (worker) => {
                        cd(`Worker #${worker.id} is dead`);
                        this._workers -= 1;
                        cluster.fork();
                    });
    
                    cluster.on('listening', (address)=>{
                        this._workers += 1;
                    });
                    
                    this.RenderInfo();
                    return;
                }
            }

            this._port = process.env.PORT || PORT;
            this._listener = this._express.listen(this._port, ()=>cd(`${this.ClusterType()} #${process.pid} started`));
        });
    }

    get apiVersion(){
        return this._apiVersion;
    }

    public unitTest() : express.Express{
        this._unitTest = true;
        return this._express;
    }

    public getUnitTest(){
        return this._unitTest;
    }

    public truncateDB(){
        const collections = Object.keys(Databases);
        const DatabasesCast = Databases as any;
        let Errors = [];
        for(let collection of collections){
            try{
                let table = DatabasesCast[collection];
                table.truncate();
            } catch (ex){ Errors.push(ex); }
        }
        return Errors;
    }

    public close(){
        // Close cluster
        if(this.IsClusterEnabled()){
            for(let id in cluster.workers) cluster.workers[id]?.kill();
            cluster.off
        }
        this._listener.close();
        Client().close();
    }
}
export default Application;