import { MyCartUseCase } from "@core/application/cart/myCart.use-case";
import { Cart } from "@core/domain/entities/Cart";
import { Registry, container } from "@core/infra/container.registry";
import React from "react";

const Carrinho = () => {
    const [cart, setCart] = React.useState<Cart>();
    const [isntCart, setIsntCart] = React.useState<boolean>(false);

    React.useEffect(() => {
        const myCartUseCase = container.get<MyCartUseCase>(Registry.MyCartUseCase);

        const cart = async () => {
            return await myCartUseCase.execute("WdCSLmbW12SPNvHdif5ZkNygOqF2");
        };

        cart().then((response) => {
            if (!response) {
                setIsntCart(true);
            }

            setCart(response);
        });
    }, []);

    function sendOrderOnWhatsapp() {
        let totalPrice = 0;
        const products = cart?.products
            ?.map((item: any) => {
                totalPrice += item.price * item.quantity;
                return `${item.name} - ${item.quantity}x`;
            })
            .join("%0A");

        const message = `Olá, gostaria de fazer o pedido:%0A - ${products}%0A%0ATotal: R$ ${totalPrice}`;

        window.open(`https://wa.me/5511999999999?text=${message}`, "_blank");
    }

    return (
        <section className="menu">
            <h1 className="headerh1">Carrinho</h1>
            {cart ? (
                cart?.products?.length === 0 ? (
                    <div className="menu">
                        <h2>Carrinho vazio</h2>
                    </div>
                ) : (
                    <div className="menu">
                        <div className="menu-list">
                            {cart?.products?.map((item: any) => (
                                <div className="menu-item" key={cart.id}>
                                    <img src={item?.image} alt={item.name} />
                                    <h2 className="itemName">{item?.name}</h2>
                                    <p className="itemDescription">{item.description}</p>
                                    <div className="hFlex mTAuto">
                                        <span>R$ {item.price}</span>
                                        <span>Quantidade: {item.quantity}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="button" onClick={() => sendOrderOnWhatsapp()}>
                            Enviar pedido
                        </button>
                    </div>
                )
            ) : isntCart ? (
                <div className="menu">
                    <h2>Carrinho vazio</h2>
                </div>
            ) : (
                <div className="menu">
                    <h2>Carregando...</h2>
                </div>
            )}
        </section>
    );
};

export default Carrinho;
