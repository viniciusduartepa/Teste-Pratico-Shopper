import { Router } from "express";

import {
  getProducts,
  updateProductsPrices,
  getUpdateProductsStatus
} from "../controllers/product.controller";

const router = Router();

router.route("/getProducts").get(getProducts);
router.route("/updateProductsPrices").put(updateProductsPrices);
router.route("/getUpdateProductStatus").post(getUpdateProductsStatus);


export default router;
