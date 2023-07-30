import { Model, Schema , model } from "mongoose";
import bcrypt from 'bcrypt';
import User from "./user.interface";

const UserSchema = new Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type : String,
        required:true
    },
    password:{
        type:String
    },
    cart:[
        {
            itemID:{
                 type:Schema.Types.ObjectId , ref:'Item' 
            },
            quantity:{
                type:Number,
                default:1, 
            }
        }
    ]

},
{timestamps:true}
);


UserSchema.pre<User>('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }

    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    next();
})

UserSchema.methods.isValidPassword = async function(password:string):Promise<Error | boolean>{
 return await bcrypt.compare(password,this.password);
}

export default model<User>('User',UserSchema);