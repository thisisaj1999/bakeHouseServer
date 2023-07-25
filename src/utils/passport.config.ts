import passport from "passport";
import { Strategy as GoogleAuthStrategy } from "passport-google-oauth20";
import { Strategy as LocalAuthStrategy } from "passport-local";
import { Request } from "express";
import UserModel from "../resources/User/user.model";
import { email } from "envalid";


passport.serializeUser<any,any>((user:any,done:any)=>{
    done(null , user.id);
});


passport.deserializeUser(async (id,done) =>{
 try{
    const user = await UserModel.findById(id).exec();
    done(null,user)
 }catch(err){
    done(err,null);
 }    
})


/**
 * Setting up local strategy! 
 */

passport.use(
    new LocalAuthStrategy({
        usernameField : 'email'
    } , async (email ,password, done)=>{
        try{
          const user = await UserModel.findOne({email});
          if(!user || !user.isValidPassword(password)){
            return done(null,false,{message:'Invalid credential'})
          }

          return done(null , user);
        }catch(err){
             return done(err);
        }
    })
)

/**
 *  
 * TODO : Implementing Google OAuth2 strategy
 * 
 */
/** 
passport.use(
    new GoogleAuthStrategy({
        clientID:  '',
        clientSecret: '',
        callbackURL: '',
    },
    async (accessToken , refreshToken , profile ,done )=>{
        //start writting your code for the logic behind the google auth here
    }
    
    )
)

*/