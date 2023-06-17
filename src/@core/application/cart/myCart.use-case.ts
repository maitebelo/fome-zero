import { Cart } from "@core/domain/entities/Cart";
import { CartGateway } from "@core/domain/gateways/cart.gateway";
import { ListProductUseCase } from "../products/listProducts.use-case";

export class MyCartUseCase {
    constructor(private cartGateway: CartGateway, private productUseCase: ListProductUseCase) {}

    async execute(userId: string): Promise<Cart | undefined> {
        const cart = await this.cartGateway.myCart(userId);

        if (!cart) {
            return undefined;
        }

        return JSON?.parse(JSON?.stringify(cart));
    }
}
