import firebase from "firebase/compat/app";
import { ProductGateway } from "../../domain/gateways/product.gateway";
import { Product } from "../../domain/entities/Products";

export class ProductFirebaseGateway implements ProductGateway {
    constructor(private firestore: firebase.firestore.Firestore) {}

    async list(): Promise<Product[]> {
        try {
            return await this.firestore
                .collection("products")
                .get()
                .then((querySnapshot) => {
                    return querySnapshot.docs.map((doc) => {
                        const data = doc.data();
                        return new Product({
                            id: doc.id,
                            name: data.name,
                            price: data.price,
                            description: data.description,
                            image: data.image,
                        });
                    });
                });
        } catch (error) {
            console.error(error);
            throw new Error("Method not implemented.");
        }
    }

    async getById(id: string): Promise<Product> {
        try {
            return await this.firestore
                .collection("products")
                .doc(id)
                .get()
                .then((doc) => {
                    const data = doc.data();
                    return new Product({
                        id: doc.id,
                        name: data?.name,
                        price: data?.price,
                        description: data?.description,
                        image: data?.image,
                    });
                });
        } catch (error) {
            console.error(error);
            throw new Error("Method not implemented.");
        }
    }
}
