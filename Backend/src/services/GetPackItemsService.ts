import { connect } from "../database";

import { DatabaseConnection } from "../interface/databaseConnection";
import { RelatedPack } from "../interface/relatedPack";
import { PackItem } from "../interface/packItem";
import { UpdateProductStatus } from "../interface/updateProductStatus";
import { Pack } from "../interface/pack";

export async function getPackItemsService(packId: Number,updateProductsStatus: UpdateProductStatus[]): Promise<PackItem[]> {
  const connection: DatabaseConnection = await connect();
  const queryResults: any[] = await connection.query(
    "SELECT  p.pack_id, p.product_id, pr.sales_price AS product_sales_price, p.qty FROM packs p INNER JOIN products pr ON p.product_id = pr.code WHERE p.pack_id = ?",
    [packId]
 );
  const packsItems: PackItem[] = queryResults[0];

    const adjustedPackItems: PackItem[]= packsItems.map((item)=>{
        const updateProductPrice = updateProductsStatus.find((updateProduct)=> updateProduct.code == item.product_id)
        if(updateProductPrice){
            return {
                ...item,
                product_sales_price: Number(updateProductPrice.new_price)
            }
        }
        return item;
  })

  return adjustedPackItems;
}
