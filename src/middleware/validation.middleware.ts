import { Request,Response,NextFunction,RequestHandler } from "express";
import { request } from "http";
import Joi from "joi";
import { Error } from "mongoose";

function validationMiddleware(schema:Joi.Schema):RequestHandler
{
    return async(
        req: Request,
        res: Response,
        next : NextFunction
    ):Promise<void> =>{
        const validationOptions = {
          abortEarly:false,
          allowUnknown: true,
          stripUnknown: true,     
        } ;

        try{
            const value=await schema.validateAsync(
                req.body,
                validationOptions
            );
            req.body = value;
            next();
        }catch(e){
            const errors: string[] =[];
            e.details.forEach((error:Joi.ValidationErrorItem)=>{
            errors.push(error.message)    
            })
            res.status(500).send({errors:errors})
        }
      }
}

export default validationMiddleware;