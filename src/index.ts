import  "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validate";
import App from "./app";
import ItemController from "./resources/item/item.controller";
import UserController from "./resources/User/user.controller";



validateEnv();



const app = new App([new ItemController() , new UserController()],Number(process.env.PORT));

app.listen();