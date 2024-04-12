import React from 'react'
import { OrderItem } from './OrderItem';
import {useState,useEffect} from "react";
import { db } from '../firebaseConfig/firebase.js';
import {collection,getDocs,deleteDoc,doc,getDoc} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useNavigate,useParams } from "react-router-dom";
import "./styles/OrderContainer.css"
import { NavBar } from './NavBar.jsx';

const OrderContainer = () => {

    const { ordenid } = useParams()
    const navigate = useNavigate()
    const [order,setOrder] = useState({})

    const getOrderById = async () => {

      const ordenRef = doc(db, "orders", ordenid);
      const orden = await getDoc(ordenRef);

      if (orden.exists()) {
        setOrder({...orden.data(),id:ordenid})
        console.log(order)
      } else {
        console.log("No such document!");
      }
      

    };

    useEffect(()=>{

        getOrderById()
        console.log(order)
        
    
    },[])


  return (
    <>
          <NavBar/>
          <br></br>
          {
            Object.entries(order).length > 0?
            <>
            <div className="container-fluid mt-5">

            <div className="row">

              <div className="col-md-9 col-lg-9">

                <div className="card">
                  <div className="card-header bg-info">
                    <h5 className="mb-0 text-white">Orden No:({ordenid})</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table product-overview">
                        <thead>
        
                          <tr>
                            <th>Codigo del producto</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th >Total</th>
                          </tr>

                        </thead>
                        <tbody>
                
                          <OrderItem order={order}/>        

                        </tbody>
                      </table>
                    
                    </div>
                  </div>
                </div>

              </div>


              <div className="col-md-3 col-lg-3">
  
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Resumen de la orden</h5>
                    <hr />
                    <small>Precio Total</small>
                    <h2>{order.total}</h2>
                  </div>
                </div>
              
              </div>
            </div>
         
          </div>
          <div className='row mt-1'>
            <div className='col-3'>
            <p className='ubicarIzquierda'><b>Nombre y apellido:</b> {order.cliente.nombre} {order.cliente.apellido}</p>
            <p className='ubicarIzquierda'><b>Correo:</b> {order.cliente.correo}</p>
            <p className='ubicarIzquierda'><b>Telefono:</b> {order.cliente.telefono}</p>
            <p className='ubicarIzquierda'><b>Fecha:</b> {order.fecha}</p>
          </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-4">
              <hr />
              <div className="text-muted my-4">
                    <Link to={"/"} className="btn btn-outline-dark" replace>
                        Regresar a inicio
                    </Link>
              </div>
            </div>
          </div>
          </>
          :
          <div>
            <br></br><br></br>
          <h3>La orden no existe</h3>
          </div>
          }
         
    </>
  )
}

export default OrderContainer
