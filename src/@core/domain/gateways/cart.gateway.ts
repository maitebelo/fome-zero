import { Cart } from "../entities/Cart";

export interface CartGateway {
    myCart(userId: string): Promise<Cart | undefined>;
    
    addProduct(productId: string, quantity: number, userId: string): Promise<Cart>;
}