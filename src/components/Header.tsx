import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
  // return (
  //   <header>
  //     <div className="logo">
  //       <img src={'assets/logo.png'} alt="Delivery de Comida" />
  //     </div>
  //     <nav>
  //       <ul>
  //         <li>
  //           <NavLink className="nav-link" aria-current=" page" to="/">Home</NavLink>
  //         </li>
  //         <li>
  //         <NavLink className="nav-link" to="/menu">Menu</NavLink>
  //         </li>
  //         <li>
  //           <NavLink className="nav-link" to="/carrinho">Carrinho</NavLink>
  //         </li>
  //         <li>
  //           <NavLink className="nav-link" to="/sobre">Sobre nós</NavLink>
  //         </li>
  //       </ul>
  //     </nav>
  //   </header>
  // );

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid py-2">
            
            <NavLink className="navbar-brand mx-auto fw-bold cursor" to="#"><img className='headerLogo' src={'assets/logo.png'} alt="Delivery de Comida" onClick={() => navigate("/")}/></NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0 ml-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/menu">Menu</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/carrinho">Carrinho</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/sobre">Sobre Nós</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</>
  )
};

export default Header;
