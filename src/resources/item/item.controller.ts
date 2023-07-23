import {Router , Request ,Response , NextFunction} from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../..//utils/exceptions/http.exception";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "./item.validation";
import ItemService from "./item.service";
import { PaginatedFunction } from "./item.interface";


class ItemController implements Controller {
    public path = '/items';
    public router = Router();
    private ItemService = new ItemService()
    constructor(){
        this.initialiseRoutes();
    }

    private initialiseRoutes():void{
          this.router.post(`${this.path}` ,
          validationMiddleware(validate.create),
          this.create ,
          );

          this.router.get(`${this.path}/all`, this.getAllItems);
          this.router.get(`${this.path}/:id`, this.getItemById);
          
    }



    private create=async(
        req :Request,res:Response,next:NextFunction
    ):Promise<Response | void> =>{
         try{
            const{title,description,price,rating} = req.body;
            const item = await this.ItemService.create(title,description,price,rating);
            res.status(200).json({item})
         }catch(e){
            next(new HttpException(400,'Cannot add item now'))
         }
    }

    private getAllItems= async(req:Request , res : Response , next :NextFunction): Promise<Response | void> => {
        try{

           const page= parseInt(req.query.page as string) || 1;
           const pageSize = parseInt(req.query.pageSize as string) || 3; 
          // getting all the items
           const items= await this.ItemService.getAllItems();
           //adding items to pagination 
            const paginatedItems = PaginatedFunction(items,page,pageSize);
                 
            res.status(200).json(paginatedItems);
        }catch(err){
           res.status(500).json({err:'Internal server error'}); 
        }
    }

    private getItemById = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try{
           const itemId = req.params.id;
           const item= await this.ItemService.getItemById(itemId);
           
           if(item){
                res.status(200).json(item);
           }else{
                res.status(400).json({message:"Item not found"})
           }
           
        }catch(error){
            res.status(500).json({error:"Internal server error"});
        }
    }
    


}

export default ItemController;

