import React from 'react'
import { CartItem } from './CartItem';
import { useContext } from 'react';
import { CartContext } from './context/CartContext';
import {collection,addDoc} from "firebase/firestore" 
import { db } from '../firebaseConfig/firebase.js';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { NavBar } from './NavBar.jsx';


const CartContainer = () => {


  const {productCartList, clearProductCartList} = useContext(CartContext);
  const {getTotal} = useContext(CartContext);
  const {getTotalProducts} = useContext(CartContext);

  const [nombre,setNombre] = useState("");
  const [apellido,setApellido] = useState("");
  const [correo,setCorreo] = useState("");
  const [correo2,setCorreo2] = useState("");
  const [telefono,setTelefono] = useState("");

  const [errorNombre,setErrorNombre] = useState(null);
  const [errorApellido,setErrorApellido] = useState(null);
  const [errorCorreo,setErrorCorreo] = useState(null);
  const [errorCorreo2,setErrorCorreo2] = useState(null);
  const [errorTelefono,setErrorTelefono] = useState(null);

  const [errorCorreoValidacion,setErrorCorreoValidacion] = useState(null);
  const [errorCorreoFormato,setErrorCorreoFormato] = useState(null);
  const navigate = useNavigate();

  const handleClick = (e) => {
    
    e.preventDefault();
    let contador = 0;  

    if(!nombre.trim()){
      setErrorNombre("el nombre no debe ser vacio");
      contador++;
    }else{
      setErrorNombre(null);
    }

    if(!apellido.trim()){
      setErrorApellido("el apellido no debe ser vacio");
      contador++;
    }else{
      setErrorApellido(null);
    }

    if(!correo.trim()){
      setErrorCorreo("el correo no debe ser vacio");
      contador++;
    }else{
      setErrorCorreo(null);
    }

    if(!correo2.trim()){
      setErrorCorreo2("el correo no debe ser vacio");
      contador++;
    }else{
      setErrorCorreo2(null);
    }

    if(!telefono.trim()){
      setErrorTelefono("el telefono no debe ser vacio");
      contador++;
    }else{
      setErrorTelefono(null);
    }
    
    if(contador>0){
      return
    }else{
        if(correo===correo2){
          setErrorCorreoValidacion(null);
          if(validateEmailFormat()){
            setErrorCorreoFormato(null);
            const tempoTranscurrido = Date.now();
            const hoy = new Date(tempoTranscurrido);
            const order = {
              fecha: hoy.toLocaleDateString(),
              cliente:{
                nombre: nombre,
                apellido: apellido,
                correo: correo,
                telefono: telefono
              },
              items: productCartList.map(producto=>({
                id:producto.id, tittle:producto.tittle, price:producto.price, cantidad:producto.cantidad, total: producto.totalPrice
              })),
              total: getTotal()
          
            }

            const orderCollection = collection(db,'orders');
            addDoc(orderCollection,order)
            .then(({id})=> navigate('/ordenes/'+id))
            
            clearProductCartList()
            console.log("exito")

          }else{
            setErrorCorreoFormato("El formato del correo es incorrecto");
          }
             
           
              
        }else{
          if(validateEmailFormat()){
            setErrorCorreoFormato(null)
          }else{
            setErrorCorreoFormato("El formato del correo es incorrecto");
          }
          setErrorCorreoValidacion("Los correos no coinciden");
          return
        }
      
    }


    function validateEmailFormat(){
                
      
      // Define our regular expression.
      var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    
      // Using test we can check if the text match the pattern
      if( validEmail.test(correo) ){
        return true;
      }else{
        return false;
      }
    }

  }
  return (
    <>

          <NavBar/>
          <br></br>
          {
            productCartList.length>0 ?
            <>
            <div className="container-fluid mt-5">

            <div className="row">

              <div className="col-md-9 col-lg-9">

                <div className="card">
                  <div className="card-header bg-info">
                    <h5 className="mb-0 text-white">{getTotalProducts()} productos en total</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table product-overview">
                        <thead>
        
                          <tr>
                            <th>Imagen</th>
                            <th>Codigo del producto</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th >Total</th>
                            <th >Accion</th>
                          </tr>

                        </thead>
                        <tbody>
    
                        {
                          productCartList.map(item=>(
                            <CartItem key={item.id} item={item}/>
                          ))
                        }

                        </tbody>
                      </table>
                      <hr />
                      <div className="d-flex no-block align-items-center">
                          <button onClick={clearProductCartList} className="btn btn-danger">      
                            Vaciar carrito
                          </button>
                        
                        <div className="ms-auto">
 
                          
                        </div>
                      </div>
                     
                      
                    
                    </div>
                  </div>
                </div>

              </div>


              <div className="col-md-3 col-lg-3">
  
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Resumen del carrito</h5>
                    <hr />
                    <small>Precio Total</small>
                    <h2>{getTotal()}</h2>
                  </div>
                </div>
              
              </div>
            </div>
            <div className='row mt-3'>
            <div className='col-3'>
                      <span className="text-danger">
                                {
                                  errorCorreoValidacion ? <span className="text-danger">{errorCorreoValidacion}</span> : null
                                }
                      </span>
                      <form>
                        <div className="form-group">
                          <label htmlFor="nombre">Nombre</label>
                          <input type="text" className="form-control" id="nombre" aria-describedby="emailHelp" placeholder="Ingrese nombre"
                          name="nombre"
                          value={nombre}
                          onChange={(e)=>{setNombre(e.target.value);setErrorNombre(null);}}
                          />
                          <span className="text-danger">
                                {
                                  errorNombre ? <span className="text-danger">{errorNombre}</span> : null
                                }
                          </span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="apellido">Apellido</label>
                          <input type="text" className="form-control" id="apellido" aria-describedby="emailHelp" placeholder="Ingrese apellido"
                          name="apellido"
                          value={apellido}
                          onChange={(e)=>{setApellido(e.target.value);setErrorApellido(null);}}
                          />
                          <span className="text-danger">
                                {
                                  errorApellido ? <span className="text-danger">{errorApellido}</span> : null
                                }
                          </span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="correo">Correo electronico</label>
                          <input type="email" className="form-control" id="correo" aria-describedby="emailHelp" placeholder="Ingrese correo"
                          name="correo"
                          value={correo}
                          onChange={(e)=>{setCorreo(e.target.value);setErrorCorreo(null);}}
                          />
                          <span className="text-danger">
                                {
                                  errorCorreo ? <span className="text-danger">{errorCorreo}</span> : null
                                }
                          </span>
                          <span className="text-danger">
                                {
                                  errorCorreoFormato ? <span className="text-danger">{errorCorreoFormato}</span> : null
                                }
                          </span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="correo2">Comprobar correo electronico</label>
                          <input type="email" className="form-control" id="correo2" aria-describedby="emailHelp" placeholder="Ingrese correo otra vez"
                          name="correo2"
                          value={correo2}
                          onChange={(e)=>{setCorreo2(e.target.value);setErrorCorreo2(null);
                          if(e.target.value===correo){
                            setErrorCorreoValidacion(null)
                          }else{
                            setErrorCorreoValidacion("Los correos no coinciden")
                          }
                          }}
                          />
                          <span className="text-danger">
                                {
                                  errorCorreo2 ? <span className="text-danger">{errorCorreo2}</span> : null
                                }
                          </span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="telefono">Telefono</label>
                          <input type="number" className="form-control" id="telefono" aria-describedby="emailHelp" placeholder="Ingrese telefono"
                          name="telefono"
                          value={telefono}
                          onChange={(e)=>{setTelefono(e.target.value);setErrorTelefono(null);}}
                          />
                          <span className="text-danger">
                                {
                                  errorTelefono ? <span className="text-danger">{errorTelefono}</span> : null
                                }
                          </span>
                        </div>
                     
                        <button type="submit" onClick={handleClick} className="btn btn-info btn-outline mt-2">
                                                    Checkout
                        </button>
                    </form>
              </div>
              </div>
          </div>
          </>
          :
          <div>
            <br></br><br></br>
          <h3>No hay productos en el carrito</h3>
          </div>
        }
    </>
  )
}

export default CartContainer
