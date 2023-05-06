import React from 'react'
import SearchInput from './SearchInput'

import logo from "../assets/Logo.png"
import userImage from '../assets/icon-user-alt.png';
import arrow from '../assets/icon-dropdown-arrow.png';
import cart from '../assets/icon-cart.png'

import "./NavBar.css";
import { useCartHelpers } from '../contexts/CartContext';
import {Link, useNavigate} from "react-router-dom"
import { useAuthHelpers} from '../contexts/AuthContext';
import { useState } from 'react';
import UserBox from './UserBox';
import Overlay from './Overlay';
export default function NavBar() {
  const [showUserBox, setShowUserBox] = useState(false);
  const {getCartCount} = useCartHelpers(); 
  const count = getCartCount();
  const isLogged = useAuthHelpers().isUserLogged();

  const navigator = useNavigate();

  return (
    <div className='navbar'>
      <Link to="/"><img src={logo} alt="Silkbay Logo" className='logo' aria-roledescription='esteEsElLogo'/></Link>
      <SearchInput />
      {
        isLogged ?
        (
          <div className='logging'>
            <Overlay show={showUserBox} onClick={() => setShowUserBox(false)}/>
          <div className='user-icon-container'>
            <img src={userImage} alt="User image" className='user-icon'/>
            <button className='arrow-button' onClick={() => setShowUserBox(!showUserBox)}><img src={arrow} alt="arrow icon" /></button>
            <UserBox show={showUserBox} setShow={setShowUserBox}/>
          </div>
  
            <button className='cart' onClick={() => navigator("/cart")}>
              <span className='visually-hidden'>Carrito de compras</span>
              <img aria-hidden="true" src={cart} alt="cart icon" />
              <span className='divisor' aria-hidden="true"></span>
              <p>{count}</p>
            </button>
     
        </div>
        ) : (
          <div className='not-logged-wrapper'>
          <Link to="/login">
            Ingresar
          </Link>
          <span className='divisor'></span>
          <Link to="/Register">
            Crear Cuenta
          </Link>
        </div>
        )
      }
     
    </div>
  )
}
