import { UpdateProductPrice } from "../interface/updateProductPrice";
import { UpdateProductStatus } from "../interface/updateProductStatus";
import { Product } from "../interface/product";
import { getProductsService } from "./GetProductsService";

export async function validateSellingPriceAboveCostService(
  updateProductsStatus: UpdateProductStatus[]
): Promise<UpdateProductStatus[]> {
  const productsFromTable: Product[] = await getProductsService();

  const validatedUpdateProductStatus: UpdateProductStatus[] =
    updateProductsStatus.map((item) => {
      if (!item.invalid) {
        const productFromTable: Product|undefined = productsFromTable.find(
          (product) => product.code === item.code
        );
        if (!productFromTable) {
          return item;
        }
        if(Number(item.new_price) < productFromTable.cost_price) {
            return {
                ...item,
                invalid: true,
                message: "Preço de venda menor que o preço de custo"
            }
        }
        return item;
      }
      return item;
    });

  return validatedUpdateProductStatus;

}
