import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={'assets/logo.png'} alt="Delivery de Comida" />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
          </li>
          <li>
          <NavLink className="nav-link" to="/menu">Menu</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/carrinho">Carrinho</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/sobre">Sobre nós</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
