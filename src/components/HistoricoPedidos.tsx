import React from "react";
import { useNavigate, NavLink } from "react-router-dom"; 

const HistoricoPedidos = () => {
    const navigate = useNavigate();

    return (
        <section className="historicopedidos">
            <h2>Histórico de Pedidos</h2>
            <div>
                <button onClick={() => navigate("/history")}>Exibir Histórico de Pedidos</button>
            </div>
            <div>
                <NavLink className="nav-link" to="/relatar-problema"><button className="btnproblema"> Relatar um Problema</button></NavLink>
            </div>
        </section>
    );
};

export default HistoricoPedidos;
