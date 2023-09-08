export interface UpdateProductStatus {

    code: number | "ERROR FLAG" ;
	name: string;
	current_price: number;
	new_price: number  | "ERROR FLAG";
    invalid: boolean;
    message: string;

}