import {Router , Request ,Response , NextFunction} from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../..//utils/exceptions/http.exception";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "./item.validation";
import ItemService from "./item.service";


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
           const items= await this.ItemService.getAllItems();
           res.status(200).json(items);
        }catch(err){
           res.status(500).json({err:'Internal server error'}); 
        }
    }


}

export default ItemController;

