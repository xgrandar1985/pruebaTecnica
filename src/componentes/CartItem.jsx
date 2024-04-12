import React from 'react';
import { useContext } from 'react';
import { CartContext } from './context/CartContext';

export const CartItem = ({item}) => {
    const {removeProduct} = useContext(CartContext);

    return (
        <>
            <tr>
                          <td width="150">
                            <img
                              src={item.pictureurl} alt={item.title}
                              width="80"
                            />
                          </td>
                          <td>${item.id}</td>
                          <td width="550">
                            <h5 className="font-500">{item.tittle}</h5>
                          </td>
                          <td>${item.price}</td>
                          <td width="70">
                          {item.cantidad}
                          </td>
                          <td width="150" align="center" className="font-500">${item.totalPrice}</td>
                          <td align="center">
                              <button className="btn btn-danger" onClick={()=>removeProduct(item.id)}>Eliminar</button>
                          </td>
                        </tr>

        </>
       
    )
}
