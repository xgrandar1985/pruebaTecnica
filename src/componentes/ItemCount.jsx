import {useState} from 'react';

export const ItemCount = ({cantidad,initial,onAdd})=>{
    const [count, setCount] = useState(initial);

    const decrementar = ()=>{
        if(count>1){
            setCount(count-1)
        }
    }

    const incrementar = ()=>{
        if(count<cantidad){
            setCount(count+1)
        }
    }

    return(
        <>

        <h4>Stock disponible: {cantidad}</h4>
        <div className='row'>
            
            <div className="col">
                    <button className="btn btn-outline-dark py-2 w-50" disabled={cantidad===0} onClick={decrementar} >-</button>
            </div>
            <div className="col">
                <h4>{count}</h4>
            </div>
            <div className="col">
                    <button className="btn btn-outline-dark py-2 w-50" disabled={cantidad===0} onClick={incrementar} >+</button>
            </div>
        
        </div>
        <div className="col">
            
            <button className="btn btn-outline-dark py-2 w-50" disabled={cantidad === 0} onClick={()=>onAdd(count)}>Agregar al carrito</button>
        </div>
        </>
    )
}