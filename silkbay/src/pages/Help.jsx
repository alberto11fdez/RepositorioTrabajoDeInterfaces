import React from 'react'
import "./Help.css"
import buscar from "../assets/buscar-guia.png"
import filtro from "../assets/buscar-filtro.png"
import carrito from "../assets/ir-carrito.png"
import borrar_home from "../assets/borrar-home.png"
import borrar_carrito from "../assets/borrar-carrito.png"
import carrito_pagar from "../assets/comprar_pagar.png"
import { ScrollRestoration } from 'react-router-dom'

export default function Help(){
    return (
        <div className="help-page">
            <ScrollRestoration />
            <h1 className="page-title"> ¿CÓMO PODEMOS AYUDARTE?</h1>
            <div className="help-container">
                <h3>¿Cómo buscar un producto?</h3>
                <p> Hacemos click en la barra de búsqueda de la parte superior de la página, una vez seleccionada, tan solo escríbimos el producto que deseamos buscar tal y como se muestra en la siguiente ilustración.</p>
                <img src={buscar} alt="como buscar un producto"/>
            </div>
            <div className='help-container'>
                <h3>¿No buscas un producto específico?</h3>
                <p> No te preocupes, con nuestra herramienta de filtro, podrás encontrar multitud de producto del tipo que estés buscando tal y como muestra la siguiente ilustración.</p>
                <img src={filtro} alt="como buscar un producto"/>
                <p>Tan solo has de pinchar en la sección que requieras y nosotros nos encargamos de buscar los productos para tí.</p>
            </div>
            <div className='help-container'>
                <h3>¿Y cómo hago una compra?</h3>
                <p> Pues muy sencillo, sigue estos pequeños pasos y observa como realizar la compra de aquel producto que tanto deseas.</p>
                <img src={carrito} alt="como ir al carrito"/>
                <p>Observa que al lado de cada producto hay un pequeño botón que dice <span>Añadir</span>, pues pulsa sobre el y verás como ese producto se añade a tu cesta</p>
            </div>
            <div className='help-container'>
                <h3>¿Pero y si me he equivocado de producto?</h3>
                <p> No te preocupes, en el mismo botón <span>Añadir</span>, observa que ahora se ha convertido en un botón con el texto "Remover". Haz click sobre el para eliminiar el producto.</p>
                <img src={borrar_home} alt="como borrar un producto"></img>
                <p> Así mismo, si añades un producto y no te has dado cuenta en el carrito podrás eliminarlo sin problema ninguno.</p>
                <img src={borrar_carrito} alt="como borrar un producto"></img>
            </div>
            <div className='help-container'>
                <h3>Muy bien, ¿Y ahora como realizo la compra?</h3>
                <p> Una vez que hayas añadido todos los productos que deseas a tu cesta. Revisa las cantidades de unidades y procede a presionar el botón de Pagar tal y como se muestra en esta última ilustración.</p>
                <img src={carrito_pagar} alt="como ir al carrito"/>
                <h2>¡Muchas gracias por su atención y disfrute de su compra!</h2>
            </div>
        </div>
    )
}