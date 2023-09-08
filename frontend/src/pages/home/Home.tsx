import { ProductsService, UpdatePrices, UpdateProductStatus } from "../../services/api/products/productsService";
import { CsvToJsonConverter } from "./components/GetCsv";
import { useState,useEffect } from "react";


import { ApiException } from "../../services/api/ApiException";
export const Home = () => {
  const [updatePrices, setUpdatePrices] = useState<UpdatePrices[] | null>(null);
  const [updateProductsStatus, setUpdateProductsStatus] = useState<UpdateProductStatus[]| null>(null); 

  const getUpdatePrices = (jsonDataArray: UpdatePrices[]) => {
    setUpdatePrices(jsonDataArray);
  };

  useEffect(() => {
    if(updatePrices){
    ProductsService.getUpdateProductsStatus(updatePrices)
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setUpdateProductsStatus(result);
        }
      });
  }}, [updatePrices]); // Run this effect whenever updatePrices changes


  return (
    <div>
      <h1>Update Prices</h1>
      {/* Pass the correct function to CsvToJsonConverter */}
      <CsvToJsonConverter onConvert={getUpdatePrices} />
      {updatePrices && (
        <div>
          <h2>JSON Output</h2>
          <pre>{JSON.stringify(updatePrices, null, 2)}</pre>
        </div>
      )}
      {updateProductsStatus && (
        <div>
          <h2>JSON Output</h2>
          <pre>{JSON.stringify(updateProductsStatus, null, 5)}</pre>
        </div>
      )}
    </div>
  );
};
