import API from '@/framework/application'

const app = new API();

app.SetApiVersion("v1");
app.SetRoutePath(`/api/${app.apiVersion}`);
app.Start();