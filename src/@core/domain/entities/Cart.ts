import { DocumentReference } from "@firebase/firestore-types";
import { ProductProps } from "./Products";

export interface ProductWithData extends ProductProps {
    quantity: number;
};

export type CartProps = {
    id: string;
    products: ProductWithData[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export class Cart {
    constructor(
        public props: CartProps
    ) {}

    get id(): string {
        return this.props.id;
    }

    get products(): ProductWithData[] {
        return this.props.products;
    }

    get userId(): string {
        return this.props.userId;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    toJSON(): CartProps {
        return {
            id: this.id,
            products: this.products,
            userId: this.userId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
