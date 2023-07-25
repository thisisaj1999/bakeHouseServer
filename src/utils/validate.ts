import {cleanEnv,str,port} from "envalid";


function validateEnv():void{
   
cleanEnv(process.env, {
   
    MONGO_USERNAME:str(),
    MONGO_PATH:str(),
    MONGO_PASSWORD:str(),
    PORT:port({default:3000}),
    JWT_SECRET_KEY:str(),
})
}


export default validateEnv;