import express ,{Application} from "express";
import cors from "cors";
import mongoose from "mongoose";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import passport from "passport";
//local imports 
import Controller from "./utils/interfaces/controller.interface";
import ErrorMiddleware from "./middleware/error.middleware";
import session from "express-session";
import configurePassport from "./utils/passport.config";


class App{
    public express :Application;
    public port :number;
    constructor(controllers:Controller[],port:number){
        this.express=express();
        this.port=port;
        this.initialiseDataBaseConnection();
        this.initialiseMiddleware();
        configurePassport();
        this.initialiseController(controllers);
        this.initialiseErrorHandling();
        
    }

   
    private initialiseMiddleware():void{
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended:false}));
        this.express.use(compression());
        this.express.use(
            session({
              secret: `${process.env.JWT_SECRET_KEY}`, 
              resave: false,
              saveUninitialized: false,
            })
          );
      
        this.express.use(passport.initialize());
        this.express.use(passport.session());
          

   }

   private initialiseController(controllers: Controller[]):void{
    controllers.forEach((controller : Controller) => {
       this.express.use('/api' , controller.router)
    });
}

private initialiseErrorHandling():void{
    this.express.use(ErrorMiddleware);
}

private initialiseDataBaseConnection():void{
    const {MONGO_URI} = process.env;
    mongoose.connect(MONGO_URI!);
}


public listen():void{
    this.express.listen(this.port,()=>{
        console.log(`App listening on port : ${this.port}`);
    })
}

}
export default App;