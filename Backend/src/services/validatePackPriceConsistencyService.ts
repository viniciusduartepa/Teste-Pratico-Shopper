import { PackItem } from "../interface/packItem";
import { RelatedPack } from "../interface/relatedPack";
import { UpdateProductStatus } from "../interface/updateProductStatus";
import { checkPackConsistencyService } from "./CheckPackConsistency";
import { getPackItemsService } from "./GetPackItemsService";
import { getProductsService } from "./GetProductsService";
import { getRelatedPacksService } from "./GetRelatedPacksService";

export async function validatePackPriceConsistencyService(
  updateProductsStatus: UpdateProductStatus[]
): Promise<UpdateProductStatus[]> {
  const productsFromTable = await getProductsService();
  const validatedUpdateProductStatus: UpdateProductStatus[] =
    await Promise.all(updateProductsStatus.map(async(product) => {
      if (!product.invalid) {
        const relatedPacks:RelatedPack[] = await getRelatedPacksService(Number(product.code));

        for(const pack of relatedPacks){
          const packitems: PackItem[] = await getPackItemsService(Number(pack.pack_id),updateProductsStatus);
            if(!await checkPackConsistencyService(packitems,updateProductsStatus)){
              return {
                ...product,
                invalid: true,
                message: "Incosistencia de pacote envolvendo esse produto"
            };
            }
        }
      }
      return product;
    }));

  return validatedUpdateProductStatus;
}
