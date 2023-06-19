import { DocumentReference } from "@firebase/firestore-types";
import { ProductProps } from "./Products";

export interface ProductWithData extends ProductProps {
    quantity: number;
}

export type OrderProps = {
    id: string;
    products: ProductWithData[];
    total: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export class Order {
    constructor(public props: OrderProps) {}

    get id(): string {
        return this.props.id;
    }

    get products(): ProductWithData[] {
        return this.props.products;
    }

    get total(): number {
        return this.props.total;
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

    toJSON(): OrderProps {
        return {
            id: this.id,
            products: this.products,
            total: this.total,
            userId: this.userId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
