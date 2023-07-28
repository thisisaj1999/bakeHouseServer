import {Router , Request , Response , NextFunction} from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../..//utils/exceptions/http.exception";
import validate from './user.validation';
import UserService from "./user.service";
import authenticated from "../../middleware/authenticated.middleware";
import validationMiddleware from "../../middleware/validation.middleware";

class UserController implements Controller {
    public path= '/users'
    public router = Router();
    private UserService = new UserService();

    constructor(){
        this.initialiseRoutes();
    }

   private initialiseRoutes(){
    
    this.router.post(`${this.path}/register`, validationMiddleware(validate.register), this.register);
    this.router.post(`${this.path}/login`, validationMiddleware(validate.login) , this.login);
    this.router.get(`${this.path}`, authenticated , this.getUser)
    this.router.post(`${this.path}/:userId/cart` , this.addItemToCart );
    this.router.get(`${this.path}/:userId/cart` , this.getCart)

   }


   private register = async (
    req:Request,
    res:Response,
    next:NextFunction):Promise<Response | void> =>{
        try{
          const {name , email , password} = req.body;

          const token = await this.UserService.register(name,email,password);

          res.status(201).json({token});

        }catch(err){
             next(new HttpException(400,err.message))
        }
    }


        private login = async(
            req:Request
            ,res:Response
            ,next:NextFunction):Promise<Response | void> =>{
              try{
                  const{ email , password} = req.body;

                  const token = await this.UserService.login(email,password);

                  res.status(200).json({token});
              }catch(err){
                next(new HttpException(400 , err.message));
              }
            }

      private getUser = (
        req:Request
        ,res:Response
        ,next:NextFunction): Response|void=>{
          if(!req.user) {return next(new HttpException(404, 'User not logged in'));}

          res.status(200).json({user:req.user})
        } 
        
        
      public addItemToCart = async(
        req:Request
        ,res:Response
        ,next:NextFunction
      ):Promise<void>=>{
        try{
          const userId =req.params.userId;
          const itemId = req.body.itemID;
          const quantity = req.body.quantity ||1;

          const updatedUser = await this.UserService.addToCart(userId,itemId,quantity);

          res.status(200).json(updatedUser);

        }catch(err){
        next(new HttpException(500,"Error adding item to Cart."))  
        }
      }

     public getCart = async(
      req:Request
        ,res:Response
        ,next:NextFunction
     ):Promise<void>=>{
        const userId = req.params.userId;

        const cartItems = await this.UserService.getCartItems(userId);

        res.status(200).json(cartItems);
     } 


}


export default UserController ; 