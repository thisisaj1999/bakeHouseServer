import passport from "passport";
import UserModel from "./user.model";
import { Request , NextFunction ,Response} from "express";


class UserService{
    private user = UserModel;

    /**
     * Registering a new User
     */
    public async register(req: Request): Promise<void> {
        return new Promise((resolve, reject) => {
            
            passport.authenticate("local-signup", (err: any, user: Express.User, info: any) => {
                if (err) {
                    
                    console.error(err);
                    reject(new Error("An error occurred during registration."));
                } else if (!user) {
                    
                    reject(new Error("Failed to register user."));
                } else {
                    
                    req.login(user, (err) => {
                        if (err) {
                            console.error(err);
                            reject(new Error("An error occurred during login after registration."));
                        } else {
                            
                            resolve();
                        }
                    });
                }
            })(req);
        });
    }

     
    /**
     * Login User
     */

    public async login(
        req:Request
    ):Promise<void>{
        return new Promise((resolve, reject) => {
           
            passport.authenticate("local", (err:any, user:any, info:any) => {
                if (err) {
                    
                    console.error(err);
                    reject(new Error("An error occurred during login."));
                } else if (!user) {
                    
                    reject(new Error("Invalid credentials."));
                } else {
                   
                    req.login(user, (err: any) => {
                        if (err) {
                            console.error(err);
                            reject(new Error("An error occurred during login."));
                        } else {
                            resolve();
                        }
                    });
                }
            })(req);
        });
    }


    /** 
    * LogOut User 
    */
    public async logout(req: Request , next:NextFunction): Promise<void> {
        try {
            req.logout(function(err){
                if(err){return next(err);}
                
            }); 
        } catch (err) {
            console.error(err);
            throw new Error("Unable to logout user.");
        }
    }

    /**
     * Get User
     */
     
    public async getUserById(id: string): Promise<any> {
        try {
            const user = await this.user.findById(id).select("-password").exec();
            return user;
        } catch (err) {
            console.error(err);
            throw new Error("Unable to get user by ID.");
        }
    }


}







export default UserService;