import React from 'react'
import SearchInput from './SearchInput'

import logo from "../assets/Logo.png"
import userImage from '../assets/icon-user-alt.png';
import arrow from '../assets/icon-dropdown-arrow.png';
import cart from '../assets/icon-cart.png'
import "./NavBarMobile.css";
import menu from "../assets/white_hamburgue_icon.png"
import {Link, useNavigate} from "react-router-dom"

export default function NavBarMobile(){
    return(
        <div className='navbarmobile'>
            <Link to="#"><img src={menu} alt="Menu" className='menu-icon' aria-roledescription='icono menu hamburguesa' /></Link>
            <SearchInput/>
        </div>
    )
}