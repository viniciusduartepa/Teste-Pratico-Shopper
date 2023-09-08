import { Request, Response } from "express";

import { Product } from "../interface/product";
import { UpdateProductPrice } from "../interface/updateProductPrice";

import { getProductsService } from "../services/GetProductsService";
import { updateProductsPricesService } from "../services/UpdateProductsPricesService";

import { getUpdateProductsStatusService} from "../services/GetUpdateProductsStatus";

export async function getProducts(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const products: Product[] = await getProductsService();
    return res.json(products);
  } catch (error) {
    console.error("Error while fetching products:", error);
    return res.status(500).json({ error: "Error while fetching products" });
  }
}

export async function updateProductsPrices(req: Request, res: Response) : Promise<Response>{
  const productUpdates: UpdateProductPrice[] = req.body;
  try {
    await updateProductsPricesService(productUpdates);
    return res.json({
      message: "Products Updated",
    });
  } catch (error) {
    console.error("Error updating products:", error);
    return res.status(500).json({
      message: "Error updating products",
    });
  }
}

export async function getUpdateProductsStatus(req: Request, res: Response) : Promise<Response>{
  const updateProducts: UpdateProductPrice[] = req.body;
  try {
    const updateProductStatus = await getUpdateProductsStatusService(updateProducts);
    return res.json(updateProductStatus);
  } catch (error) {
    console.error("Error updating products:", error);
    return res.status(500).json({
      message: "Error updating products",
    });
  }
}