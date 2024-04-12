import {useState,useEffect} from "react";
import "./styles/ItemListContainer.css"
import { Link } from "react-router-dom";
import {collection,getDocs,query, where} from "firebase/firestore" 
import { db } from '../firebaseConfig/firebase.js';
import { ItemList } from "./ItemList";
import { useParams } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { Navigate } from "react-router-dom";
import { NavBar } from "./NavBar.jsx";

const ItemListContainer = ({greeting}) => {

  const { user } = useContext(UserContext);

  const [products,setProducs] = useState([])
  const {tipo} = useParams();
  //2 fererenciar  a la db firestore

  //productos
  const producsCollection = collection(db,"productos")
  //3 funcion para mostrar todos los elementos

  const getProducts = async () => {
      
      const data = await getDocs(producsCollection)
      if(!tipo){
        setProducs(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    } else{
        const q = query(producsCollection, where("categoria", "==", tipo));
        const querySnapshot = await getDocs(q);
        setProducs(querySnapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
        
    }
      
  }

  useEffect(()=>{

    getProducts()
  
  },[tipo])

  let titulo;
  if (!tipo) {
    titulo = greeting;
  } else {
    titulo = "Lista de Productos de Anime de tipo "+tipo;
  }

  return (

      <>{
        user ? <div>
        <NavBar/>
        <br></br>
        <h2 className="text-muted text-center mt-5 mb-3">{titulo}</h2>
        <div className="container pb-5 px-lg-5">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
           
          <ItemList products={products}/>
                                           
          </div>
        </div>
        </div> : <Navigate to="/" />
      }
      </>

  )
}

export default ItemListContainer