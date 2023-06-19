import React from "react";
import { toast } from "react-toastify";

import { Registry, container } from "../@core/infra/container.registry";
import { Product } from "@core/domain/entities/Products";
import { AddProductOnCartUseCase } from "@core/application/cart/addProductOnCart.use-case";
import UserContext from "contexts/UserContext";
import { useNavigate } from "react-router-dom";

const MenuCard = ({ item }: { item: Product }) => {
    const { userData } = React.useContext(UserContext);
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false);
    const navigate = useNavigate();

    function handleAddProduct(id: string) {
        const addProductUseCase = container.get<AddProductOnCartUseCase>(Registry.AddProductOnCartUseCase);

        setButtonLoading(true);

        const cart = async () => {
            if (!userData?.uid) {
                toast.error("Você precisa estar logado para adicionar produtos ao carrinho");

                navigate("/login");
                return;
            }

            return await addProductUseCase.execute(id, 1, userData?.uid);
        };

        cart().then((response) => {
            setButtonLoading(false);
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
