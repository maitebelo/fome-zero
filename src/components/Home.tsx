import React from 'react';
import Menu from './Menu';
import HistoricoPedidos from './HistoricoPedidos';

const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-mask">
        <div className="hero-content">
          <h1>Delivery de Comida</h1>
          <p>Faça seu pedido agora mesmo e receba em casa!</p>
          <a href="#" className="button">
            Ver Cardápio
          </a>
          </div>
        </div>
      </section>
      <Menu/>
      <HistoricoPedidos/>
    </>
  );
};

export default Home;
