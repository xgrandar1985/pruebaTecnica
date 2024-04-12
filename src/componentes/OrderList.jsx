import React, { useEffect, useState } from 'react'
import { NavBar } from './NavBar'
import {collection,getDocs,query, where} from "firebase/firestore" 
import { db } from '../firebaseConfig/firebase.js';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { Navigate } from "react-router-dom";

export const OrderList = () => {

  const { user } = useContext(UserContext);
  const [orders,setOrders] = useState([])
    //2 fererenciar  a la db firestore

  //productos
  const ordersCollection = collection(db,"orders")
  //3 funcion para mostrar todos los elementos

  const getOrders = async () => {
      
      const data = await getDocs(ordersCollection)
      setOrders(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      
  }

  useEffect(() => {
    getOrders();
    console.log(orders);
  }, [])

  return (
    <>{ user ? <div>
     <NavBar/>
      <br/>
      <br/>
      <br/>
      <form className="form-horizontal m-3 w-25">
      <div className="form-group">
          <input className='form-control' type = "text"
          name = "categoria"
          placeholder='Filtrar por producto'
          ></input>
          </div>
      </form>
      {
        

        orders.map(order => {return <div key={order.id}><div className="container-fluid mt-5">

        <div className="row">

          <div className="col-md-9 col-lg-9">

            <div className="card">
              <div className="card-header bg-info">
                <h5 className="mb-0 text-white">Orden No: {order.id}</h5>
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
                    <tbody>{
                      order.items?.map(proc=>(
                          
                            <tr key={proc.id}>
                              <td>{proc.id}</td>
                              <td width="550">
                                <h5 className="font-500">{proc.tittle}</h5>
                              </td>
                              <td>${proc.price}</td>
                              <td width="70">
                                {proc.cantidad}
                              </td>
                              <td width="150" align="center" className="font-500">${proc.total}</td>
                            </tr>
                  
                        ))}
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
        <p className='ubicarIzquierda'><b>Correo:</b> {order.cliente.correo} </p>
        <p className='ubicarIzquierda'><b>Telefono:</b> {order.cliente.telefono} </p>
        <p className='ubicarIzquierda'><b>Fecha:</b> {order.fecha} </p>
      </div>
      </div>
      </div>})

      }
      <div className="row">
        <div className="col-md-12 mb-4">
          <hr />
          <div className="text-muted my-4">
                <Link to={"/"} className="btn btn-outline-dark" replace>
                    Regresar a inicio
                </Link>
          </div>
        </div>
      </div></div> : <Navigate to="/" />}
    </>
  )
}
