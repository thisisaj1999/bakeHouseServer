import { Document } from "mongoose";


export default interface Item extends Document{
    title :string,
    description : string,
    price : string,
    rating : string,
}