import Application from "@/core/express";
import Reflection from "@/core/reflection";

class API extends Application{
    protected async Setup(){
        super.Setup();

        const Reflect = new Reflection();
        var Routers = await Reflect.SearchRouter(`./src/api/${this.apiVersion}`);
        for(var Router of Routers) this.RegisterRoute(Router.router, Router.category);
    }
}
export default API;