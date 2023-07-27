import UserModel from "./user.model";
import token from '../../utils/token';

class UserService{
    private user = UserModel;

    /**
     * Registering a new User
     */
    public async register(
        name : string,
        email:string,
        password:string
    ):Promise<string |Error>{
       try {
          const user = await this.user.create({name,email,password})

          const accessToken = token.createToken(user);
          return accessToken;
       } catch(err){
           console.log(err.message);
           throw new Error('Unable to create a user');
       }
    }

     
    /**
     * Login User
     */

    public async login(
        email:string,
        password:string
    ):Promise<string |Error >{
      try{
        const user = await this.user.findOne({email});

        if(!user) throw new Error('User not found , Please Register first');

        if(await user.isValidPassword(password)){
            return token.createToken(user);
        }else{
            throw new Error('Invalid Credentials')
        }
      }catch(err){
           console.log(err.message);
          throw new Error('Unable to login')
      }
    }


   /**
    * Adding Item to cart
    */
   public async addToCart(userId:string , itemID:string,quantity:number) {
    try{
        const user = await UserModel.findById(userId);

        if(!user) throw new Error("User not Found");
        const existingItem = user.cart.find((cartItem) => cartItem.itemID.toString() ===itemID);

        if(existingItem){
            existingItem.quantity = Number (existingItem.quantity) + quantity  ;
        }
        else{
            user.cart.push({itemID , quantity})
        }

        await user.save()

        return user;

    }catch(err){
        throw new Error("Error adding item to cart.");
    }
   }



}


export default UserService;