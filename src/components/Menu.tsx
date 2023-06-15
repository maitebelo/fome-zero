import React from "react";

import { Registry, container } from "../@core/infra/container.registry";
import { ListProductUseCase } from "../@core/application/products/listProducts.use-case";
import { Product } from "@core/domain/entities/Products";

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
                <div className="menu">
                    {menu.map((item) => (
                        <div className="menu-item" key={item.id}>
                            <img src={item.image} alt={item.name} />
                            <h2 className="itemName">{item.name}</h2>
                            <p className="itemDescription">{item.description}</p>
                            <span>R$ {item.price}</span>
                            <a href="#" className="button">
                                Adicionar ao carrinho
                            </a>
                        </div>
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