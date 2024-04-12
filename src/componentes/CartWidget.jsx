import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CartContext } from './context/CartContext';

import React from 'react'

const CartWidget = () => {
  const {getTotalProducts} = useContext(CartContext);
  return (

    <>

        <Link to={"/carrito/"} className="btn btn-outline-dark" replace>
        <FontAwesomeIcon icon={faCartShopping} />
      <span className="ms-3 badge rounded-pill bg-dark"> {getTotalProducts()}</span>
        </Link>
</>


    
  )
}
export default CartWidget
