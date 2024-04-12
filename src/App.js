import './App.css';
import Home from './componentes/Home';
import { BrowserRouter, Route,Routes } from "react-router-dom";
import ItemListContainer from './componentes/ItemListContainer';
import { NavBar } from './componentes/NavBar';
import ItemDetailContainer from './componentes/ItemDetailContainer';
import CartContainer from './componentes/CartContainer';
import { CartProvider } from './componentes/context/CartContext';
import OrderContainer from './componentes/OrderContainer';
import { Login } from './componentes/Login';
import { UserProvider } from './componentes/context/UserContext';
import { OrderList } from './componentes/OrderList';



function App() {



  return (
    <>
        <UserProvider>
        <CartProvider>
        
        <BrowserRouter>
            <div className="App">
                <div> 
                    <Routes>
                      <Route path='/' element={<Login/>}/>
                      <Route path='/home' element={<Home/>}/>
                      <Route path="/productos" element={<ItemListContainer greeting="Lista de Productos de Anime"/>}/>
                      <Route path='/productos/:id' element={<ItemDetailContainer/>}/>  
                      <Route path='/items/:tipo' element={<ItemListContainer greeting=" "/>}/> 
                      <Route path="/carrito" element={<CartContainer/>}/>
                      <Route path='/ordenes/:ordenid' element={<OrderContainer/>}/> 
                      <Route path='/ordenes' element={<OrderList/>}/> 
                    </Routes>
                </div>
            </div>
            </BrowserRouter>
           
      </CartProvider>
      </UserProvider>
    </>
  );
}

export default App;
