import React, { useState } from 'react'
import Login_Banner from '../assets/Login_Banner.png'
import Logo_SilkBay_Icon from '../assets/Logo-Icon.png'
import Input from '../components/Input'
import LockIcon from "../assets/icon-lock.png";
import UserIcon from "../assets/icon-user.png";
import { Form, Link, useActionData, useNavigate, useSubmit } from 'react-router-dom';
import Button from '../components/Button';
import { getUser } from '../utils/db';
import { useAuthHelpers } from '../contexts/AuthContext';
import { useEffect } from 'react';

export async function action ({request, params}){
  const formData = await request.formData();
  const username = formData.get("username");
  const user = await getUser(username);

  if(!user){
    return {
      error: 404
    }
  }

  if(formData.get("password") != user.password){
    return {
      error: 400
    }
  }
  user.password = "";

  return {"user": user};
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let [errorText, setErrorText] = useState("");
  const {setUser} = useAuthHelpers();
  const navigate = useNavigate();
  const submit = useSubmit();
  const actionData = useActionData();
  useEffect(() => {
    if(actionData){
      if("user" in actionData){
        setUser(actionData.user);
        navigate("/");
      }
    }
  }, [actionData])

  function onSubmit(ev){  
    ev.preventDefault();
    if(username.trim().length === 0){
      setErrorText("Ingrese el nombre de usuario")
      return;
    }
    if(password.trim().length === 0){
      setErrorText("Ingrese una contraseña")
      return;
    }

    submit(ev.currentTarget);
  }
  return (
    <>
        <div className='section1'>
            <img className='Login_Banner' src= {Login_Banner} alt="Login_Banner"/>
            <h1>¡Bienvenido otra vez<br/> a <span className='title-login-banner'>Silk Bay!</span></h1>
        </div>
        <div className='section2'>
        <Link to="/"><img className='Logo_SilkBay_Icon' src= {Logo_SilkBay_Icon} alt="Logo Silkbay"/></Link>
            <h2 className='login-title'>Ingresar</h2>
            <p>¡Ingresa para disfrutar de todas las <br/> funciones de SilkBay</p>

            <Form className='form' method='post' action='/login' onSubmit={onSubmit}>
              {errorText.length > 0 && (<p className='error'>{errorText}</p>)}
              {actionData && "error" in actionData && (<p className='error'>El nombre de usuario o la contraseña son incorrectos</p>)}
              <Input icon={UserIcon} value={username} mutator={setUsername} type="text" placeholder="Nombre de Usuario" name="username" title='Nombre de Usuario' aria-label='Nombre de Usuario'  />
              <Input icon={LockIcon} value={password} mutator={setPassword} type="password" placeholder="Contraseña" name="password"  title='Contraseña' aria-label='Contraseña'  />
               <Button type="secondary">
                Ingresar
               </Button>

               <div className="form-footer">
                        <small>¿No tienes cuenta?</small>
                        <Link to="/register" className='sign-link'>
                            Crear cuenta
                        </Link>
                    </div>
            </Form>
        </div>
    </>
  )
}
