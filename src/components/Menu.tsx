import React from "react";
import { toast } from "react-toastify";

import { Registry, container } from "../@core/infra/container.registry";
import { ListProductUseCase } from "../@core/application/products/listProducts.use-case";
import { Product, ProductProps } from "@core/domain/entities/Products";
import { AddProductOnCartUseCase } from "@core/application/cart/addProductOnCart.use-case";
import MenuCard from "./MenuCard";

const Menu = () => {
    const [menu, setMenu] = React.useState<Product[] | []>([]);

    React.useEffect(() => {
        const listProductsUseCase = container.get<ListProductUseCase>(Registry.ListProductUseCase);

        const products = async () => {
            return await listProductsUseCase.execute();
        };

        products().then((response) => {
            setMenu(response);
        });
    }, []);

    return (
        <section className="menu">
            <h1 className="headerh1">Cardápio</h1>
            {menu.length > 0 ? (
                <div className="menu-list">
                    {menu.map((item) => (
                            <MenuCard item={item} key={item?.id}/>
                    ))}
                </div>
            ) : (
                <div className="menu">
                    <h2>Carregando...</h2>
                </div>
            )}
        </section>
    );
};

export default Menu;
