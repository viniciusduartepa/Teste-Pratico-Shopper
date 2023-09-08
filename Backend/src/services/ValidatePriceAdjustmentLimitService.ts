
import { UpdateProductStatus } from "../interface/updateProductStatus";
import { Product } from "../interface/product";
import { getProductsService } from "./GetProductsService";

export async function validatePriceAdjustmentLimitService(
  updateProductsStatus: UpdateProductStatus[]
): Promise<UpdateProductStatus[]> {

  const validatedUpdateProductStatus: UpdateProductStatus[] =
    updateProductsStatus.map((item) => {
      if (!item.invalid) {
        const limitPriceChange = item.current_price * 0.1;
        const priceChange = Math.abs(Number(item.new_price)- item.current_price);
        if(Number(priceChange)>Number(limitPriceChange))
        return {
            ...item,
            invalid: true,
            message: "O mudança de preço esta excdendo o limite de ±10% do preço atual"
        };
        return item;
      }
      return item;
    });

  return validatedUpdateProductStatus;

}
