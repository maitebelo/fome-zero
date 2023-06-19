import { ProductWithData } from "../entities/Cart";
import { Order } from "../entities/Order";

export interface OrderGateway {
    createOrder(products: ProductWithData[], userId: string): Promise<Order>;

    listOrder(userId: string): Promise<Order[]>;
}