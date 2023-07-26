import ItemModel from "./item.model";
import Item from '../../resources/item/item.interface';
import { Collection } from "mongoose";


class ItemService{
    private item= ItemModel;
    
    
   /**
    * adding a new Item
    */
   public async create (title :string , description:string , price:number , rating:number,category:string):Promise<Item>{
               try{
                const item = await this.item.create({title,description,price, rating,category});
                
                return item;
               }catch(error){
                throw new Error('Unable to add product now')
               } 
}

     /**
                * Fetching all the items 
                */
     public async getAllItems(): Promise<Item[]>{
        try{
            const items = await this.item.find();
            return items
        }catch(err){
             throw new Error('Unable to Fetch all items')
        }
     }


     /**
      * Fetching the single item by id
      */
     public async getItemById(id:string):Promise<Item | null>{
        try{
            const item = await this.item.findById(id);
            return item;
        }catch(err){
          throw new Error('Unable to fetch the item you searched');
        }
     }


     /**
      * Fetching by category
      * 
      */
     public async getItemByCategory(category:string):Promise<Item[]>{
        try{
            const itemWithCategory = await this.item.find({category});
            return itemWithCategory;
        }catch(err){
          console.error('error Fetching item by category' , err)
          return [];
        }
     }


      
     




}

export default ItemService;