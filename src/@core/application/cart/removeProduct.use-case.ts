import { Cart } from "@core/domain/entities/Cart";
import { CartGateway } from "@core/domain/gateways/cart.gateway";

export class RemoveProductUseCase {
    constructor(private cartGateway: CartGateway) {}

    async execute(productId: string, userId: string): Promise<Cart> {
        return await this.cartGateway.removeProduct(productId, userId);
    }
}
