import  "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validate";
import App from "./app";



validateEnv();

const app = new App([],Number(process.env.port));

app.listen();