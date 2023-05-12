import React from 'react'
import SearchInput from './SearchInput'

import logo from "../assets/Logo.png"
import userImage from '../assets/icon-user-alt.png';
import arrow from '../assets/icon-dropdown-arrow.png';


import "./NavBar.css";
 
import {Link, useNavigate} from "react-router-dom"
import { useAuthHelpers} from '../contexts/AuthContext';
import { useState } from 'react';
import UserBox from './UserBox';
import Overlay from './Overlay';
import CartButton from './CartButton';
export default function NavBar() {
  const [showUserBox, setShowUserBox] = useState(false);
 
 
  const isLogged = useAuthHelpers().isUserLogged();

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
  
          <CartButton />
     
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
