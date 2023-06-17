import { ProductGateway } from "../../domain/gateways/product.gateway";
import { Product } from "../../domain/entities/Products";

export class ListProductUseCase {
    constructor(private productGateway: ProductGateway) {}

    async execute(): Promise<Product[]> {
        const products = await this.productGateway.list();

        return JSON.parse(JSON.stringify(products));
    }

    async getById(id: string): Promise<Product> {
        const product = await this.productGateway.getById(id);

        return JSON.parse(JSON.stringify(product));
    }
}
