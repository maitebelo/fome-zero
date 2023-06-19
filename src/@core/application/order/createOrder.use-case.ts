import { User } from "firebase/auth";
import { AuthenticatorGateway } from "../../domain/gateways/authenticator.gateway";
import { OrderGateway } from "@core/domain/gateways/order.gateway";
import { Order } from "@core/domain/entities/Order";
import { ProductWithData } from "@core/domain/entities/Cart";

export class CreateOrderUseCase {
    constructor(private orderGateway: OrderGateway) {}

    async execute(products: ProductWithData[], userId: string): Promise<Order> {
        return await this.orderGateway.createOrder(products, userId)
    }        
    
}