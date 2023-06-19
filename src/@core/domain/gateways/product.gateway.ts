import { Product } from "../entities/Products";

export interface ProductGateway {
    list(): Promise<Product[]>;

    getById(id: string): Promise<Product>;
}