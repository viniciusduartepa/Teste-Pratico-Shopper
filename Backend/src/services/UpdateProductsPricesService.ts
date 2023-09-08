import { connect } from "../database";

import { Product } from "../interface/product";
import { DatabaseConnection } from "../interface/databaseConnection";
import { UpdateProductPrice } from "../interface/updateProductPrice";
import { Pack } from "../interface/pack";
import { UpdateProductStatus } from "../interface/updateProductStatus";

import { getProductsService } from "./GetProductsService";
import { getPacksService } from "./GetPacksService";
import { getUpdateProductsStatusService } from "./GetUpdateProductsStatus";

export async function updateProductsPricesService(
  productUpdates: UpdateProductPrice[]
): Promise<void> {
  
  const updateProductsStatus: UpdateProductStatus[] =  await getUpdateProductsStatusService(productUpdates);
  const invalidsProducts: UpdateProductStatus[] = updateProductsStatus.filter((item)=>item.invalid)
  if(invalidsProducts.length>0){
    const Errors = invalidsProducts.map(item => `${item.message} no item ${item.code}`).join('\n');

    throw new Error(
      `Update failed with the following errors:\n  ${Errors}`
    );
  }

  const connection: DatabaseConnection = await connect();
  for (const update of productUpdates) {
    await connection.query(
      "UPDATE products SET sales_price = ? WHERE code = ?",
      [update.new_price, update.product_code]
    );
  }
}
