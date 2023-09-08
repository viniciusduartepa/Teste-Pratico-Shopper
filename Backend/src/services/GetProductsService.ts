import { connect } from "../database";

import { Product } from "../interface/product";
import { DatabaseConnection } from "../interface/databaseConnection";

export async function getProductsService(): Promise<Product[]> {
    const connection: DatabaseConnection = await connect();
    const queryResults: any[] = await connection.query("SELECT * FROM products");
    const products: Product[] = queryResults[0];
    
    return products;
}
