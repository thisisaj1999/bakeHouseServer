import { Schema , model } from "mongoose";
import Item from "./item.interface";


const ItemSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type: Number,
        required:true
    },
   
},

{timestamps:true}
)

export default model<Item>('Item',ItemSchema);
