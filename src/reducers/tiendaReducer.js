import Carrito from "../componentes/Carrito";

const estadoInicial = {
    productos: [
        {id: 1, nombre: 'Producto 1'},
        {id: 2, nombre: 'Producto 2'},
        {id: 3, nombre: 'Producto 3'},
        {id: 4, nombre: 'Producto 4'}
      
    ],

carrito: []

}





const reducer = (estado = estadoInicial, accion) => {
    switch(accion.type){
        case 'AGREGAR_PRODUCTO_AL_CARRITO':
            const {nombre, idAlProductoAAgregar} = accion;
            if(estado.carrito.length === 0){
                return {
                    ...estado,
                    carrito:[{id: idAlProductoAAgregar, nombre: nombre, cantidad: 1 }]
                }

            } else {
                

                    const nuevoCarrito = [...estado.carrito];

                    //comprobamos si el carrito ya tiene el id del producto que queremos agregar
                    const yaEstaEnCarrito = nuevoCarrito.filter((productoDeCarrito)=>{
                      return productoDeCarrito.id === idAlProductoAAgregar
                    }).length >0;


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

                        return{
                            ...estado,
                            carrito: nuevoCarrito
                        }





            }
            

            
            default:
                return estado;
                


    }

}


export default reducer;