import React from 'react'
import Register_Banner from '../assets/Register-Banner.png'
import Logo_SilkBay_Icon from '../assets/Logo-Icon.png'
import Input from '../components/Input'
import Button from '../components/Button'
export default function Register(){
    return (
        <>
            <div className='section1'>
                <img className='Register_Banner' src= {Register_Banner} alt=""/>
                <h2>Registrate para <br/> empezar tu <span className='title-register-banner'>aventura</span></h2>
            </div>
            <div className='section2'>
                <img className='Logo_SilkBay_Icon' src= {Logo_SilkBay_Icon} alt=""/>
                <h2>Registrarse</h2>
                <p>¡Hazte una cuenta para disfrutar de <br/> todas las funciones en Silk Bay!</p>
                <Input type="text" placeholder="Nombre de Usuario"/>
                <Input type="password" placeholder="Contraseña"/>
                <Input type="password" placeholder="Confirmar Contraseña"/>
                <Button type={"secondary"}>Registrarse</Button>
            </div>
        </>

    )
}