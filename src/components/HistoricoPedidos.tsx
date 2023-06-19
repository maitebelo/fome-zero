import React from "react";
import { useNavigate } from "react-router-dom";

const HistoricoPedidos = () => {
    const navigate = useNavigate();

    return (
        <section className="historicopedidos">
            <h2>Histórico de Pedidos</h2>
            <div>
                <button onClick={() => navigate("/history")}>Exibir Histórico de Pedidos</button>
            </div>
            <div>
                <button className="btnproblema">Relatar um Problema</button>
            </div>
        </section>
    );
};

export default HistoricoPedidos;
