
import { UpdateProductPrice } from "../interface/updateProductPrice";
import { UpdateProductStatus } from "../interface/updateProductStatus";

import { getProductsService } from "./GetProductsService";
import { validateInputFieldsService } from "./ValidateInputFieldsService";
import { validateInputDataTypeService } from "./ValidateInputDataTypeService";
import { validateProductExistenceService } from "./ValidateProductExistenceService";
import { validateSellingPriceAboveCostService } from "./ValidateSellingPriceAboveCostService";
import { validatePriceAdjustmentLimitService } from "./ValidatePriceAdjustmentLimitService";
import { validatePackPriceConsistencyService } from "./validatePackPriceConsistencyService";

export async function getUpdateProductsStatusService( updateProducts: UpdateProductPrice[]): Promise<UpdateProductStatus[]>{
    let updateProductStatus: UpdateProductStatus[] = updateProducts.map((product)=>{
        return {
            code: product.product_code? product.product_code : "ERROR FLAG",
            name: "",
            current_price: 0,
            new_price: product.new_price?product.new_price:"ERROR FLAG",
            invalid:  false,
            message: "",
        };
    });

    updateProductStatus = await validateInputFieldsService(updateProductStatus);
    updateProductStatus = await validateProductExistenceService(updateProductStatus);
    updateProductStatus = await validateInputDataTypeService(updateProductStatus);
    updateProductStatus = await validateSellingPriceAboveCostService(updateProductStatus);
    updateProductStatus = await validatePriceAdjustmentLimitService(updateProductStatus);
    updateProductStatus = await validatePackPriceConsistencyService(updateProductStatus);
    


    return updateProductStatus;
    
}
