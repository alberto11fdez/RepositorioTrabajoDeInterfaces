import React from 'react'
import "./Card.css";
import cart from '../assets/icon-cart.png'

export default function Card() {
  return (
    <div className='card'>
        <img src="" alt="" className='card-img' />
        <p className='card-title'></p>
        <div className='card-bottom'>
            <p className='price'></p>
            <button>
                <p>Añadir</p>
                <img src={cart} alt="" />
            </button>
        </div>
    </div>
  )
}
