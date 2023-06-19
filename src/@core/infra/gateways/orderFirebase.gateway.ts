import firebase from "firebase/compat/app";
import { OrderGateway } from "@core/domain/gateways/order.gateway";
import { Order } from "@core/domain/entities/Order";
import { ProductWithData } from "@core/domain/entities/Cart";
import { CartFirebaseGateway } from "./cartFirebase.gateway";

export class OrderFirebaseGateway implements OrderGateway {
    constructor(private firestore: firebase.firestore.Firestore, private cartGateway: CartFirebaseGateway) {}

     async listOrder(userId: string): Promise<Order[]> {
        try {
            return await this.firestore
                .collection("orders")
                .where("userId", "==", userId)
                .get()
                .then((querySnapshot) => {
                    return querySnapshot.docs.map((doc) => {
                        const data = doc.data();
                        return new Order({
                            id: doc.id,
                            products: data.products,
                            total: data.total,
                            userId: data.userId,
                            createdAt: data.createdAt,
                            updatedAt: data.updatedAt,
                        });
                    });
                });
        } catch (error) {
            console.error(error);
            throw new Error("Method not implemented.");
        }
    }

    async createOrder(products: ProductWithData[], userId: string): Promise<Order> {
        try {
            const order = await this.firestore.collection("orders").add({
                products: products.map((product) => ({
                    product: this.firestore.collection("products").doc(product.id),
                    quantity: product.quantity,
                })),
                userId,
                total: products.reduce((acc, product) => acc + product.quantity * product.price, 0),
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            await this.cartGateway.deleteAllProducts(userId);

            return new Order({
                id: order.id,
                products,
                total: products.reduce((acc, product) => acc + product.quantity * product.price, 0),
                userId,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        } catch (error) {
            console.error(error);
            throw new Error("Method not implemented.");
        }
    }
}
