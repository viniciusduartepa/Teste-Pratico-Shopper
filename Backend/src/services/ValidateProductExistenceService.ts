import { UpdateProductStatus } from "../interface/updateProductStatus";
import { getProductsService } from "./GetProductsService";
import { Product } from "../interface/product";

export async function validateProductExistenceService(
  updateProductsStatus: UpdateProductStatus[]
): Promise<UpdateProductStatus[]> {
  const productsFromTable = await getProductsService();
  const validatedUpdateProductStatus: UpdateProductStatus[] =
    updateProductsStatus.map((product) => {
      if (!product.invalid) {
        const productInfo = productsFromTable.find(
          (item) => Number(item.code) === Number(product.code)
        );
        if (!productInfo) {
          return {
            ...product,
            invalid: true,
            message: "Produto não existe",
          };
        }
        return {
          ...product,
          code: Number(product.code),
          name: productInfo.name,
          current_price: productInfo.sales_price,
        };
      }
      return product;
    });

  return validatedUpdateProductStatus;
}
