import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import CartWidget from './CartWidget'
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import { logout } from "../firebaseConfig/firebase";

export const NavBar = () => {

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
 
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">

          <Link to="/" className="nav-link">

              <FontAwesomeIcon 
                icon={faHouse}
                className="ms-1"
                size="lg"
              />
              <span className="ms-2 h5">Inicio</span>
            </Link>

            
        
              

          <div className={"navbar-collapse offcanvas-collapse"}>
          <div className="navbar-nav me-auto mb-lg-0">

              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Productos
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <li className="nav-item">
                    <Link className="nav-link" to="/productos">Todos los productos</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/items/peluche">Peluches</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/items/toy">Toys</Link>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
              
            </div>
            <Link to="/ordenes" className="nav-link">

              <FontAwesomeIcon 
                icon={faFileInvoice}
                className="ms-1"
                size="lg"
              />
              <span className="ms-2 h5">Ordenes</span>
            </Link>
            <CartWidget/>
            <button className="btn btn-danger m-1" onClick={handleLogout} variant="contained">
              Logout
            </button>
            
          </div>
        </div>
      </nav>
    </header>

  )
}
