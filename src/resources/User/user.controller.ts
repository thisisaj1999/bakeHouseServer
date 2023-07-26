import {Router , Request , Response , NextFunction} from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../..//utils/exceptions/http.exception";
import validate from './user.validation';
import UserService from "./user.service";

import validationMiddleware from "../../middleware/validation.middleware";
import passport from "passport";


class UserController implements Controller {
    public path= '/user'
    
    public router = Router();
    private UserService = new UserService();

    constructor(){
        this.initialiseRoutes();
    }

   private initialiseRoutes(){
    
    this.router.post(`${this.path}/register`, validationMiddleware(validate.register), this.register);
     
    this.router.post(`${this.path}/login`, validationMiddleware(validate.login), this.login);


    this.router.get(`${this.path}/:id`, this.getUser)
    this.router.get(`${this.path}/:id/logout`,this.logout)

   }


   private register = async (
    req:Request,
    res:Response,
    next:NextFunction) =>{
        try{
          await this.UserService.register(req);
          res.status(200).json({ message: "Registration successful." });
        }catch(err){
             next(new HttpException(400,err.message))
        }
    }


        private login = async(
            req:Request
            ,res:Response
            ,next:NextFunction):Promise<Response | void> =>{
              try{
                  
                  await this.UserService.login(req);

                  res.status(200).json(req.user);
              }catch(err){
                next(new HttpException(400 , err.message));
              }
            }

            private getUser = async (req: Request, res: Response, next: NextFunction) => {
              try {
                  const userId = req.params.id;
      
                  
                  const user = await this.UserService.getUserById(userId);
      
                  if (!user) {
                      return res.status(404).json({ error: "User not found." });
                  }
      
                  
                  res.status(200).json({ user: user });
              } catch (err) {
                  console.error(err);
                  res.status(500).json({ error: "Unable to get user." });
              }
          };  

          private logout = async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.UserService.logout(req, next);
                res.status(200).json({ message: "Logout successful." });
                
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: "Unable to logout." });
            }
        };
        
}


export default UserController ; 