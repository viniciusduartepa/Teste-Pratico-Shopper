import { UpdateProductStatus } from "../interface/updateProductStatus";

export async function validateInputDataTypeService(
  updateProductsStatus: UpdateProductStatus[]
): Promise<UpdateProductStatus[]> {
  const validatedUpdateProductStatus: UpdateProductStatus[] =
    updateProductsStatus.map((item) => {
      if (!item.invalid) {
        if (isNaN(Number(item.new_price))) {
          return {
            ...item,
            invalid: true,
            message: "Novo preço em formato invalido",
          };
        }
      }
      return { ...item, new_price: Number(item.new_price) };
    });

  return validatedUpdateProductStatus;
}
