import { connect } from "../database";

import { DatabaseConnection } from "../interface/databaseConnection";
import { RelatedPack } from "../interface/relatedPack";
import { PackItem } from "../interface/packItem";
import { UpdateProductStatus } from "../interface/updateProductStatus";
import { Pack } from "../interface/pack";
import { getProductsService } from "./GetProductsService";

export async function checkPackConsistencyService(packItems: PackItem[],updateProductsStatus: UpdateProductStatus[]): Promise<Boolean> {
    
    const products = await getProductsService();

    const packProduct = products.find((item)=>
        item.code == packItems[0].pack_id
    )

    const packUpdateProduct = updateProductsStatus.find((item)=>
        item.code == packItems[0].pack_id
    )
 
    const packPrice = packUpdateProduct? Number(packUpdateProduct.new_price): packProduct?.sales_price;

    let expectedPackPrice: number = 0;

    for(const packItem of packItems ){
        expectedPackPrice += packItem.product_sales_price * packItem.qty;
    }

    if(Number(expectedPackPrice)!=Number(packPrice)) return false;

    return true;
}
