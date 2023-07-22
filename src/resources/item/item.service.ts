import ItemModel from "./item.model";
import Item from '../../resources/item/item.interface';


class ItemService{
    private item= ItemModel;
    
   /**
    * adding a new Item
    */
   public async create (title :string , description:string , price:number , rating:number):Promise<Item>{
               try{
                const item = await this.item.create({title,description,price, rating});
                
                return item;
               }catch(error){
                throw new Error('Unable to add product now')
               } 
}
}

export default ItemService;