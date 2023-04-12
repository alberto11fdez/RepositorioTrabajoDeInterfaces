import React from 'react'
import SearchInput from './SearchInput'

import logo from "../assets/Logo.png"
import userImage from '../assets/icon-user-alt.png';
import arrow from '../assets/icon-dropdown-arrow.png';
import cart from '../assets/icon-cart.png'
import "./NavBar.css";
import { useCartHelpers } from '../contexts/CartContext';
import {Link} from "react-router-dom"
import { useAuthHelpers, useUser } from '../contexts/AuthContext';
export default function NavBar() {
  const {getCartCount} = useCartHelpers();
  const user = useUser();
  const {isUserLogged} = useAuthHelpers();
 

  console.log(isUserLogged());

 
  return (
    <div className='navbar'>
      <Link to="/"><img src={logo} alt="Silkbay Logo" className='logo'/></Link>
      <SearchInput />
      {
        isUserLogged() ?
        (
          <div className='logging'>
          <div className='user-icon-container'>
            <img src={userImage} alt="User image" className='user-icon'/>
            <button className='arrow-button'><img src={arrow} alt="arrow icon" /></button>
          </div>
          <button className='cart'>
            <img src={cart} alt="cart icon" />
            <span className='divisor'></span>
            <p>{getCartCount()}</p>
          </button>
        </div>
        ) : (
          <div className='not-logged-wrapper'>
          <Link to="/login">
            Ingresar
          </Link>
          <span className='divisor'></span>
          <Link to="/login">
            Crear Cuenta
          </Link>
        </div>
        )
      }
     
    </div>
  )
}
