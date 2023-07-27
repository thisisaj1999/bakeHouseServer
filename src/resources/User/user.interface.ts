import { Document } from "mongoose";

export default interface User extends Document{
    name:string,
    email:string,
    password:string,
    cart:CartItem[]
    isValidPassword(password:string) :Promise<Error | boolean>;
}


export interface CartItem{
itemID :string,
quantity: Number
}