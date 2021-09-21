import API from '@/framework/application'

const app: API = new API();

app.SetApiVersion(process.env.API_VERSION || "v1");
app.SetRoutePath(`/api/${app.apiVersion}`);
app.Start();

export default app;