import React from 'react'
import "./Card.css";
import cart from '../assets/icon-cart.png'
import Arrow from "../assets/icon-right-arrow.png";
import { useCartHelpers } from '../contexts/CartContext';
import {Link} from "react-router-dom";
import { useAuthHelpers, useUser } from '../contexts/AuthContext';

/**
 * 
 * @param {import('../utils/db').Product} product 
 * @returns 
 */
export default function Card({onAddHook, ...product}) {
  const {isProductInCart, addCartProduct, removeProductFromCart} = useCartHelpers();
  const user = useUser();
  function onAdd(){
    if(user){
      addCartProduct(product);
      return;
    }
    onAddHook();
  }
  let formattedTitle = product.title.length > 30 ? product.title + "..." : product.title
  return (
    <div className='card'>
        <Link to={`/products/${product.id}`}>
            <img src={product.image} alt={product.title} className='card-img' />
        </Link>
        <p className='card-title'>{formattedTitle}</p>
        <div className='card-bottom'>
            <p className='price'>{product.price}€</p>

            { isProductInCart(product.id) ? 
              (
                <button className='remove-button' onClick={() => removeProductFromCart(product.id)}>
                  Remove
                </button>
              )
            :
            ( 
              <button aria-label='Añadir producto al carrito' name='addButton' role="button" title='Añadir producto' className='add-button' onClick={() => onAdd()}>
                <p className='visually-hidden'>Añadir producto al carrito</p>
                <p className='add-button-text' aria-hidden="true">Añadir</p>
                <img src={cart} alt="" className='cart-icon' aria-hidden="true"/>
                <img src={Arrow} alt="arrow icon" className='arrow-icon' aria-hidden="true"/>
              </button>
            )
            }
          
        </div>
    </div>
  )
}
