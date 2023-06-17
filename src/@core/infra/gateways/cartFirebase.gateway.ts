import { Cart, ProductWithData } from "@core/domain/entities/Cart";
import { CartGateway } from "@core/domain/gateways/cart.gateway";

import { DocumentReference } from "@firebase/firestore-types";
import firebase from "firebase/compat/app";

export class CartFirebaseGateway implements CartGateway {
    constructor(private firestore: firebase.firestore.Firestore) {}

    async myCart(userId: string): Promise<Cart> {
        try {
            return await this.firestore
                .collection("cart")
                .where("userId", "==", userId)
                .limit(1)
                .get()
                .then(async (querySnapshot) => {
                    return await querySnapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        return new Cart({
                            id: doc.id,
                            products: await Promise.all(
                                data?.products?.map(async (product: ProductWithData) => {
                                    // @ts-ignore
                                    const productData = await product?.product?.get();
                                    return {
                                        id: productData?.id,
                                        name: productData.data()?.name,
                                        price: productData.data()?.price,
                                        description: productData.data()?.description,
                                        image: productData.data()?.image,
                                        quantity: product.quantity,
                                    };
                                })
                            ),
                            userId: data.userId,
                            createdAt: data.createdAt,
                            updatedAt: data.updatedAt,
                        });
                    })[0];
                });
        } catch (error) {
            console.error(error);
            throw new Error("Method not implemented.");
        }
    }

    async addProduct(productId: string, quantity: number, userId: string): Promise<Cart> {
        try {
            let cart = await this.myCart(userId);

            if (!cart) {
                cart = await this.create(userId);
            }

            const productIndex = cart?.products.findIndex((product) => product?.id === productId);
            
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += quantity;
            } else {
                // @ts-ignore
                cart.products.push({   
                    id: productId,
                    quantity,
                });
            }

            await this.firestore
                .collection("cart")
                .doc(cart.id)
                .update({
                    products: [
                        ...cart?.products?.map((product) => ({
                            
                                product: this.firestore
                                    .collection("products")
                                    // @ts-ignore
                                    .doc(`${product?.id}`),
                                quantity: product.quantity,
                            })
                        ),
                    ],
                    updatedAt: new Date(),
                });

            return cart;
        } catch (error) {
            console.error(error);
            throw new Error("Method not implemented.");
        }
    }

    async create(userId: string): Promise<Cart> {
        try {
            await this.firestore.collection("cart").add({
                userId,
                products: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            return await this.myCart(userId);
        } catch (error) {
            console.error(error);
            throw new Error("Method not implemented.");
        }
    }
}
