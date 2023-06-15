export type ProductProps = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
};

export class Product {
    constructor(public props: ProductProps) {}

    get id(): string {
        return this.props.id;
    }

    get name(): string {
        return this.props.name;
    }

    get description(): string {
        return this.props.description;
    }

    get price(): number {
        return this.props.price;
    }

    get image(): string {
        return this.props.image;
    }

    toJSON(): ProductProps {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            image: this.image,
        };
    }
}
