import { Document } from "mongoose";


export default interface Item extends Document{
    title :string,
    description : string,
    price : number,
    rating : number,
}


function paganateItems(items : Item[] , page : number ,pageSize: number):{
currentItemsPage:number;
totalItemsPages: number;
totalItems:number;
items:Item[];
}{
    const totalItems= items.length;
    const totalItemsPages = Math.ceil(totalItems/pageSize);
    const currentItemsPage = Math.max(1,Math.min(page,totalItemsPages));
    const startIndex = (currentItemsPage-1) * pageSize;
    const endIndex = Math.min(startIndex+pageSize, totalItems);

    const paginatedItems = items.slice(startIndex,endIndex);
    return {
        currentItemsPage,
        totalItemsPages,
        totalItems,
        items: paginatedItems,
    }
}


export {paganateItems as PaginatedFunction} ;