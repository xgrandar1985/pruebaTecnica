import React from 'react'
import { ItemCount } from './ItemCount'
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from './context/CartContext';

export const ItemDetail = ({product}) => {
  const {addProduct} = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  //console.log(product)

  const onAdd = (count)=>{
      addProduct(product,count);
      setQuantity(count);
  }
  return (
    <>
           <div className="d-none d-lg-block col-lg-1">
          <div className="image-vertical-scroller">
            <div className="d-flex flex-column">
            
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 mb-4">
            {<img src={product.pictureurl} className="border rounded ratio ratio-1x1 dimension2" alt="..."/>}
            </div>
          </div>

        </div>

        <div className="col-lg-5">
          <div className="d-flex flex-column h-100">
            
            <h2 className="mb-1">{product.tittle}</h2>
            
            <h4 className="text-muted mb-4">{product.price}</h4>
          
            <div className="row g-3 mb-4">
              
                  <ItemCount cantidad={product.cantidad} initial={1} onAdd={onAdd}/>
           
            </div>

            <h4 className="mb-0">Descripcion</h4>
            <hr />
            <p className="lead flex-shrink-0">
              <small>
                 {product.detalle}
              </small>
            </p>
          </div>
        </div>
    </>
  )
}
