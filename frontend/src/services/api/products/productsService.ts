import { ApiException } from "../ApiException";
import { Api } from "../ApiConfig";

export interface UpdateProductStatus {
    code: number | "ERROR FLAG" ;
	name: string;
	current_price: number;
	new_price: number  | "ERROR FLAG";
    invalid: boolean;
    message: string;

}


export interface UpdatePrices {
    product_code: number;
    new_price: number;
}

export interface Product {

    code: number;
	name: string;
	cost_price: number;
	sales_price: number;

}
const getUpdateProductsStatus = async (dataToValidate: UpdatePrices[]): Promise<UpdateProductStatus[] | ApiException> => {
    try {
      const { data } = await Api().post<any>('/products/getUpdateProductStatus', dataToValidate);
      return data;
    } catch (error: any) {
      return new ApiException(error.message || 'Erro ao criar o registro.');
    }
};
const getAllProductsService = async (): Promise<Product[] | ApiException> => {
    try {
      const { data } = await Api().get<Product[]>('/products/getUpdateProductStatus');
      return data;
    } catch (error: any) {
      return new ApiException(error.message || 'Erro ao criar o registro.');
    }
};
const updateProducts = async (dataToUpdate: UpdatePrices[]): Promise<void | ApiException> => {
    try {
      const { data } = await Api().post<any>('/products/updateProductsPRices', dataToUpdate);
      return data;
    } catch (error: any) {
      return new ApiException(error.message || 'Erro ao criar o registro.');
    }
};
export const ProductsService = {
    getUpdateProductsStatus,
    updateProducts,
    getAllProductsService
  };
  