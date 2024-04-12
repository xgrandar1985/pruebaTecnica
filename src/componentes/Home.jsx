import React, { useEffect } from 'react'
import ItemListContainer from '../componentes/ItemListContainer';
import Banner from "../landing/Banner"; 
import { NavBar } from './NavBar';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { Navigate } from "react-router-dom";

const Home = () => {

  const { user } = useContext(UserContext);

  return (
    <>{
          user ? <div>
            <NavBar/>
            <Banner />
            <ItemListContainer greeting="Lista de Productos de Anime"/></div> : <Navigate to="/" />
        
      }
    </>
  )
}

export default Home
