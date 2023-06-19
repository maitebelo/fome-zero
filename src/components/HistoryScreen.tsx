import React from "react";
import "../styles/App.css";
import { Order } from "@core/domain/entities/Order";
import { Registry, container } from "@core/infra/container.registry";
import { ListOrderUseCase } from "@core/application/order/listOrder.use-case";
import UserContext from "contexts/UserContext";

export default function HistoryScreen() {
    const { userData } = React.useContext(UserContext);
    const listOrderUseCase = container.get<ListOrderUseCase>(Registry.ListOrderUseCase);
    const [isOrder, setIsntOrder] = React.useState<boolean>(false);
    const [orders, setOrder] = React.useState<Order[]>([]);

    /*   const orders = [
    { id: 1, items: ['Pizza', 'Refrigerante'] },
    { id: 2, items: ['Hambúrguer', 'Batatas Fritas'] },
    { id: 3, items: ['Sushi', 'Molho de Soja'] },
    { id: 4, items: ['Salada', 'Água'] },
  ]; */

    const handleReportProblem = (orderId: string) => {
        console.log(`Relatando problema para o pedido com o ID ${orderId}`);
    };

    const getOrders = async () => {
        return await listOrderUseCase.execute(userData?.uid);
    };

    React.useEffect(() => {
        getOrders().then((response) => {
            if (!response) {
                setIsntOrder(true);
            }
            console.log(response);
            setOrder(response);
        });
    }, []);

    return (
        <div className="history-screen">
            <h1 className="headerh1">Histórico de Pedidos</h1>
            <div className="order-cards">
                {orders.map((order) => (
                    <div className="order-card" key={order?.id}>
                        <h2>Pedido #{order?.id?.substring(0, 8)}</h2>
                        <p>Itens:</p>
                        <ul>
                            {order?.products?.map((item, index) => {
                                return <li key={index}>{item.name}</li>;
                            })}
                        </ul>
                        <button className="btnproblema" onClick={() => handleReportProblem(order.id)}>
                            Relatar Problema
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
