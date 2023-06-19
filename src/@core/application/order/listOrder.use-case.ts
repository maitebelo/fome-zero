import { User } from "firebase/auth";
import { AuthenticatorGateway } from "../../domain/gateways/authenticator.gateway";
import { OrderGateway } from "@core/domain/gateways/order.gateway";
import { Order } from "@core/domain/entities/Order";
import { ProductWithData } from "@core/domain/entities/Cart";

export class ListOrderUseCase {
    constructor(private orderGateway: OrderGateway) {}

    async execute(userId: string): Promise<Order[]> {
        return await this.orderGateway.listOrder(userId);
    }
}
