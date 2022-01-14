import React from 'react';
import styled from 'styled-components';
import {NavLink, Routes, Route} from 'react-router-dom';
import Inicio from './componentes/Inicio';
import Blog from './componentes/Blog';
import Tienda from './componentes/Tienda';
import Error404 from './componentes/Error404';
import Carrito from './componentes/Carrito';
import { useState } from 'react/cjs/react.development';
import {Provider,} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers/tiendaReducer';




const App = () => {


const [carrito, cambiarCarrito] = useState([]);
// si el carrito no tiene elementos entonces agregamos uno
const agregarProductoAlCarrito = (idAlProductoAAgregar, nombre) => {
  if(carrito.length === 0 ){ 
    cambiarCarrito([{id: idAlProductoAAgregar, nombre: nombre, cantidad: 1}]);
  } else{

    const nuevoCarrito = [...carrito];

//comprobamos si el carrito ya tiene el id del producto que queremos agregar
const yaEstaEnCarrito = nuevoCarrito.filter((productoDeCarrito)=>{
  return productoDeCarrito.id === idAlProductoAAgregar
}).length >0;

//si ya tiene el producto entonces lo tenemos que actualizar
if(yaEstaEnCarrito){
//para ello tenemos que buscarlo, obtener su posicion en el arreglo
//y en base a su posicion ya actualizamos el valor
    nuevoCarrito.forEach((productoDeCarrito, index) => {
        if (productoDeCarrito.id === idAlProductoAAgregar){
      const cantidad = nuevoCarrito[index].cantidad;
      nuevoCarrito[index] = {id: idAlProductoAAgregar, nombre:nombre, cantidad:cantidad +1 }
        }

    });

}
// de otra forma agregamos el producto al arreglo
else {
   nuevoCarrito.push(
  { 
     id: idAlProductoAAgregar,
     nombre: nombre,
     cantidad: 1
  });
}
//por ultimo actualizamos el carrito
cambiarCarrito(nuevoCarrito);



  }
}
const store = createStore(reducer);
console.log(store.getState());

  return (
  <Provider store={store}>
     <Contenedor>
       <Menu>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/Blog">Blog</NavLink>
          <NavLink to="/Tienda">Tienda</NavLink>
       </Menu>

       <main>

         <Routes>
            <Route path="/" element = {<Inicio />}> </Route>
            <Route path="/blog" element = {<Blog/>}> </Route>
            <Route path="/tienda" element = {<Tienda/>} > </Route>
            <Route element = {<Error404/>}> </Route>
         </Routes>

       </main>

       <aside>

         <Carrito />
         
      </aside>
     </Contenedor>
  </Provider>
  );
}
 
export default App;



const Contenedor = styled.div`
    max-width: 1000px;
    padding: 40px;
    width: 90%;
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;
    margin: 40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;
 
const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    grid-column: span 2;
    border-radius: 3px;
 
    a {
        color: #fff;
        display: inline-block;
        padding: 15px 20px;
    }
 
    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
`;