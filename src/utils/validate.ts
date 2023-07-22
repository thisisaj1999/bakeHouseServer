import {cleanEnv,str,port} from "envalid";


function validateEnv():void{
    console.log('accessedddd')
cleanEnv(process.env, {
   
    MONGO_USERNAME:str(),
    MONGO_PATH:str(),
    MONGO_PASSWORD:str(),
    PORT:port({default:3000}),
})
}


export default validateEnv;