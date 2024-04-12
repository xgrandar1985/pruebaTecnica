import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children})=>{
    const [productCartList, setProductCartList] = useState([]);

    const isInCart = (id)=>{
        const elementExists = productCartList.some((elemento)=>elemento.id === id);
        return elementExists;
    }

    const addProduct = (product, cant)=>{
        const newList = [...productCartList];
        //verifico si el producto existe en el arreglo
        // si existe, actualice la propiedad cantidad de ese producto
        if(isInCart(product.id)){
            const productIndex = productCartList.findIndex(element=>element.id===product.id);
            newList[productIndex].cantidad = newList[productIndex].cantidad + cant;
            newList[productIndex].totalPrice = newList[productIndex].cantidad * newList[productIndex].price;
            setProductCartList(newList)
        } else{
        //si no existe, agregue el producto al listado
            const newProduct={...product, cantidad:cant, totalPrice: cant*product.price}
           
            const newList = [...productCartList];
            newList.push(newProduct);
            setProductCartList(newList);
        }
    }

    const removeProduct = (idProduct)=>{
        const copyArray = [...productCartList];
        const newArray = copyArray.filter(elm=>elm.id !== idProduct);
        setProductCartList(newArray);
    }

    const clearProductCartList=()=>{
        setProductCartList([])
    }

    const getTotalProducts = ()=>{
        const totalProducts = productCartList.reduce((accion,item)=>accion + item.cantidad,0);
        return totalProducts;
    }

    const getTotal = ()=>{
        const total = productCartList.reduce((accion,item)=>accion + item.cantidad*item.price,0);
        return total;
    }

    return(
        <CartContext.Provider value={{productCartList,addProduct, removeProduct, clearProductCartList, isInCart, getTotalProducts,getTotal}}>
            {children}
        </CartContext.Provider>
    )
}