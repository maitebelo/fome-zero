import React from 'react';
import "../styles/App.css";

export default function HistoryScreen() {
  const orders = [
    { id: 1, items: ['Pizza', 'Refrigerante'] },
    { id: 2, items: ['Hambúrguer', 'Batatas Fritas'] },
    { id: 3, items: ['Sushi', 'Molho de Soja'] },
    { id: 4, items: ['Salada', 'Água'] },
  ];

  const handleReportProblem = (orderId: number) => { 
    console.log(`Relatando problema para o pedido com o ID ${orderId}`);
  };

  return (
    <div className="history-screen">
      <h1 className="headerh1">Histórico de Pedidos</h1>
      <div className="order-cards">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h2>Pedido #{order.id}</h2>
            <p>Itens:</p>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className="btnproblema" onClick={() => handleReportProblem(order.id)}>Relatar Problema</button>
          </div>
        ))}
      </div>
    </div>
  );
}
