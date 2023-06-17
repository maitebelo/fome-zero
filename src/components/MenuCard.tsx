import React from "react";
import { toast } from "react-toastify";

import { Registry, container } from "../@core/infra/container.registry";
import { Product } from "@core/domain/entities/Products";
import { AddProductOnCartUseCase } from "@core/application/cart/addProductOnCart.use-case";

const MenuCard = ({ item }: { item: Product }) => {
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false);

    function handleAddProduct(id: string) {
        const addProductUseCase = container.get<AddProductOnCartUseCase>(Registry.AddProductOnCartUseCase);

        setButtonLoading(true);

        const cart = async () => {
            return await addProductUseCase.execute(id, 1, "WdCSLmbW12SPNvHdif5ZkNygOqF2");
        };
        
        cart().then((response) => {
            toast.success("Produto adicionado ao carrinho");
        });
    }

    return (
        <div className="menu-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h2 className="itemName">{item.name}</h2>
            <p className="itemDescription">{item.description}</p>
            <span>R$ {item.price}</span>
            <a className="button" onClick={() => handleAddProduct(item.id)}>
                {buttonLoading ? "Adicionando..." : "Adicionar ao carrinho"}
            </a>
        </div>
    );
};

export default MenuCard;
