import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthHelpers, useUser } from '../contexts/AuthContext';
import "./UserBox.css"
import activeArrow from "../assets/icon-arrow-active-dropdown.png";
import logoutIcon from "../assets/icon-signout.png";
import { useCartHelpers } from '../contexts/CartContext';
export default function UserBox({show, setShow}) {
  const user = useUser();
  const {emptyCart} = useCartHelpers();
  const {logout} = useAuthHelpers();
  if (!show){
    return;
  }
  return (
    
    <div className='userBox'>
        <div className="userBox-body">
            <p className='welcome'>¡Hola <span className='username-text'>{user.username}</span>!</p>
            <div className='options'>
                <Link to="/user" onClick={() => setShow(false)}>
                    Tu cuenta
                </Link>
                <Link to="/user/purchases" onClick={() => setShow(false)}>
                    Tus pedidos
                </Link>
            </div>
        </div>

        <div className='userBox-footer'>
            <button className='signout-btn' onClick={() => {logout(); emptyCart();}}>
                <p>Cerrar sesión</p>
                <img src={logoutIcon} alt="" />
            </button>

            <button className='toggle-button' onClick={() => setShow(false)}>
                <img src={activeArrow} alt="" />
            </button>
        </div>
    </div>
  )
}
