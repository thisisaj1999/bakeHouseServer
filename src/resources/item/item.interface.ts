import { Document } from "mongoose";


export default interface Item extends Document{
    title :string,
    description : string,
    price : number,
    rating : number,
}