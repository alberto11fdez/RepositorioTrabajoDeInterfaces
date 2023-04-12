import React from 'react'
import "./Card.css";
import cart from '../assets/icon-cart.png'
import Arrow from "../assets/icon-right-arrow.png";
import { useCartHelpers } from '../contexts/CartContext';
import {Link} from "react-router-dom";

/**
 * 
 * @param {import('../utils/db').Product} product 
 * @returns 
 */
export default function Card(product) {
  const {isProductInCart, addCartProduct, removeProductFromCart} = useCartHelpers();

  let formattedTitle = product.title.length > 30 ? product.title + "..." : product.title
  return (
    <div className='card'>
        <Link to={`/products/${product.id}`}>
            <img src={product.image} alt="Card image" className='card-img' />
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
              <button className='add-button' onClick={() => addCartProduct(product)}>
                <p className='add-button-text'>Añadir</p>
                <img src={cart} alt="cart icon" className='cart-icon' />
                <img src={Arrow} alt="arrow icon" className='arrow-icon'/>
              </button>
            )
            }
          
        </div>
    </div>
  )
}
