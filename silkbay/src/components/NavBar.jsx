import React from 'react'
import SearchInput from './SearchInput'

import logo from "../assets/Logo.png"
import userImage from '../assets/icon-user-alt.png';
import arrow from '../assets/icon-dropdown-arrow.png';
import cart from '../assets/icon-cart.png'
import "./NavBar.css";
export default function NavBar() {
  return (
    <div className='navbar'>
      <img src={logo} alt="Silkbay Logo" className='logo'/>
      <SearchInput />
      <div className='logging'>
        <div className='user-icon-container'>
          <img src={userImage} alt="User image" className='user-icon'/>
          <button className='arrow-button'><img src={arrow} alt="arrow icon" /></button>
        </div>
        <button className='cart'>
          <img src={cart} alt="cart icon" />
          <span className='divisor'></span>
          <p>2</p>
        </button>
      </div>
    </div>
  )
}
