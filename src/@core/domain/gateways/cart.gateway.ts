import { Cart } from "../entities/Cart";

export interface CartGateway {
    myCart(userId: string): Promise<Cart | undefined>;
    
    addProduct(productId: string, quantity: number, userId: string): Promise<Cart>;

    removeProduct(productId: string, userId: string): Promise<Cart>;

    decrementProduct(productId: string, userId: string): Promise<Cart>;

    incrementProduct(productId: string, userId: string): Promise<Cart>;

    deleteAllProducts(userId: string): Promise<Cart>;
}