import {Request , Response , NextFunction} from "express";
import token from "../utils/token";
import UserModel from '../resources/User/user.model';
import Token from '../utils/interfaces/token.interface';
import HttpException from "../utils/exceptions/http.exception";
import jwt , {verify}from 'jsonwebtoken';
import passport = require("passport");




async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
   passport.authenticate('local',{session:false},async (err: any,user: any,info: any)=>{
      try{
        if(err || !user){
            return res.status(401).json({error:'Unauthorized'})
        }
        req.user=user;
        return next();
      }catch(error){
        return next(error)
      }    
})(req,res,next);
}

export default authenticatedMiddleware;