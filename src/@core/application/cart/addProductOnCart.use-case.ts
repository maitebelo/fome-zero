import { Cart } from "@core/domain/entities/Cart";
import { CartGateway } from "@core/domain/gateways/cart.gateway";

export class AddProductOnCartUseCase {
    constructor(private cartGateway: CartGateway) {}

    async execute(productId: string, quantity: number, userId: string): Promise<Cart> {
        const cart = await this.cartGateway.addProduct(productId, quantity, userId);

        return JSON.parse(JSON.stringify(cart))
    }

    async increment(productId: string, userId: string): Promise<Cart> {
        const cart = await this.cartGateway.incrementProduct(productId, userId);

        return JSON.parse(JSON.stringify(cart))
    }
} 