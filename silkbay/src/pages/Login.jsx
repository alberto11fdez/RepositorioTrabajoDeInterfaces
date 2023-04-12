import React from 'react'
import Login_Banner from '../assets/Login_Banner.png'
import Logo_SilkBay_Icon from '../assets/Logo-Icon.png'
import Input from '../components/Input'
export default function Login() {
  return (
    <>
        <div className='section1'>
            <img className='Login_Banner' src= {Login_Banner} alt=""/>
            <h2>¡Bienvenido otra vez<br/> a <span className='title-login-banner'>Silk Bay!</span></h2>
        </div>
        <div className='section2'>
            <img className='Logo_SilkBay_Icon' src= {Logo_SilkBay_Icon} alt=""/>
            <h2 className='Ingresar'>Ingresar</h2>
            <p>¡Ingresa para disfrutar de todas las <br/> funciones de SilkBay</p>
            <Input type="text" placeholder="Nombre de Usuario"/>
            <Input type="password" placeholder="Contraseña"/>
        </div>
    </>
  )
}
