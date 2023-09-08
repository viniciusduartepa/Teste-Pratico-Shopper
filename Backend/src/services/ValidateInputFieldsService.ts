import { UpdateProductStatus } from "../interface/updateProductStatus";


export async function validateInputFieldsService( updateProductsStatus: UpdateProductStatus[]): Promise<UpdateProductStatus[]>{
    const validatedUpdateProductStatus: UpdateProductStatus[] = updateProductsStatus.map((item)=>{
      if(!item.invalid){
      if(item.code==="ERROR FLAG") {return {...item,invalid: true,message:"Produto sem codigo"}};
      if(item.new_price==="ERROR FLAG") {return {...item,invalid: true,message:"Produto sem novo preço"}};
      }
      return item;
    });
    

    return validatedUpdateProductStatus;
    
}
