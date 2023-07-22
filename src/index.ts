import  "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validate";
import App from "./app";
import ItemController from "./resources/item/item.controller";



validateEnv();



const app = new App([new ItemController],Number(process.env.port));

app.listen();