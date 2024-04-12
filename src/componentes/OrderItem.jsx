import React from 'react';

export const OrderItem = ({order}) => {

    return (
        <>
        {
        
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

      ))
        }       

        </>
       
    )
}
