import React from "react";
import { toast } from "react-toastify";
import { BsFillTrashFill } from "react-icons/bs";

import { MyCartUseCase } from "@core/application/cart/myCart.use-case";
import { Cart } from "@core/domain/entities/Cart";
import { Registry, container } from "@core/infra/container.registry";
import UserContext from "contexts/UserContext";
import { RemoveProductUseCase } from "@core/application/cart/removeProduct.use-case";
import { Product } from "@core/domain/entities/Products";

const Carrinho = () => {
    const { userData } = React.useContext(UserContext);
    const [cart, setCart] = React.useState<Cart>();
    const [isntCart, setIsntCart] = React.useState<boolean>(false);
    const myCartUseCase = container.get<MyCartUseCase>(Registry.MyCartUseCase);

    const getCart = async () => {
        return await myCartUseCase.execute(userData?.uid);
    };

    React.useEffect(() => {
        getCart().then((response) => {
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

        const message = `Olá, gostaria de fazer o pedido:%0A - ${products}%0A%0ATotal: R$ ${totalPrice?.toFixed(2)}`;

        window.open(`https://wa.me/5511999999999?text=${message}`, "_blank");

        toast.success("Pedido enviado no whatsapp");
    }

    const removeProduct = async (item: Product) => {
        toast.loading("Removendo produto do carrinho");

        const removeProductUseCase = container.get<RemoveProductUseCase>(Registry.RemoveProductUseCase);

        await removeProductUseCase.execute(item.id, userData?.uid);

        getCart().then((response) => {
            if (!response) {
                setIsntCart(true);
            }

            setCart(response);
        });
        toast.dismiss();
        toast.success("Produto removido do carrinho");
    };

    return (
        <section className="menu vFlex">
            <h1 className="headerh1">Carrinho</h1>
            {cart ? (
                cart?.products?.length === 0 ? (
                    <div className="menu">
                        <h2>Carrinho vazio</h2>
                    </div>
                ) : (
                    <div className="menu">
                        <div className="menu-list">
                            {cart?.products?.map((item: any, index: number) => (
                                <div className="menu-item" key={index}>
                                    <img src={item?.image} alt={item.name} />
                                    <div className="hFlex">
                                        <h2 className="itemName">{item?.name}</h2>
                                        <button
                                            onClick={() => removeProduct(item)}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                                padding: "5px",
                                                color: "#fff",
                                                backgroundColor: "#4a9655",
                                                borderRadius: "5px",
                                                marginRight: "10px",
                                            }}
                                        >
                                            <BsFillTrashFill size={20} />
                                        </button>
                                    </div>
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
