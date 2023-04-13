import React from 'react'
export default function(props){
    return(
        <>
        <h1>Mi cuenta</h1>
        <h2>Datos</h2>
        <p>Nombre: {props.user}</p>

        <h2>Historial de pedidos</h2>
        </>
    );
}