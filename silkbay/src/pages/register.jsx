import React from 'react'
import Register_Banner from '../assets/Register-Banner.png'
import Logo_SilkBay_Icon from '../assets/Logo-Icon.png'
import Input from '../components/Input'
import Button from '../components/Button'
import { useState } from 'react'
import { Form, Link, redirect, useActionData, useNavigate, useSubmit } from 'react-router-dom'
import LockIcon from "../assets/icon-lock.png";
import UserIcon from "../assets/icon-user.png";
import { useDebounce } from '../utils/hooks'
import { checkUsernameTaken, createUser } from '../utils/db'
import { useAuthHelpers } from '../contexts/AuthContext'
import { useEffect } from 'react'
 
export async function action({request, params}){
  
    const formData = await request.formData();
    const user = await createUser(formData);
    user.password = "";
    return {user};
}

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
export default function Register(){
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const [usernameChecked, setUsernameChecked] = useState(false);
    const submit = useSubmit();
    const actionData = useActionData();
    const {setUser} = useAuthHelpers();
    const navigate = useNavigate();
    useEffect(() => {
        if(actionData){
            setUser(actionData.user);
            navigate("/")
        }
    }, [actionData])
    async function checkUsername(){
        if (username.trim().length == 0) return;
        const isTaken = await checkUsernameTaken(username);
        setUsernameChecked(!isTaken);
        
    }

    useDebounce(checkUsername, 600, [username]);
    function onSubmit(ev){
        ev.preventDefault();
        checkUsername();
        if (username === ""){
            setErrorText("Por favor indique un nombre de usuario")
            return;
        }
        if(password === ""){
            setErrorText("Por favor indique la contraseña");
            return;
        }

        if (!passwordRegex.test(password)){
            setErrorText("La contraseña debe de contener 8 digitos, almenos 1 letra y almenos 1 número")
            return;
        }

        if(password !== repeatPassword){
            setErrorText("Las contraseñas tienen que coincidir")
            return;
        }
        if (!usernameChecked){
            setErrorText("El nombre de usuario ya está tomado");
            return;
        }
        submit(ev.currentTarget)
    }

  
    return (
        <>
            <div className='section1'>
                <img className='Register_Banner' src= {Register_Banner} alt=""/>
                <h1>Registrate para <br/> empezar tu <span className='title-register-banner'>aventura</span></h1>
            </div>
            <div className='section2'>
                <img className='Logo_SilkBay_Icon' src= {Logo_SilkBay_Icon} alt=""/>
                <h2 className='register-title'>Registrarse</h2>
                <p>¡Hazte una cuenta para disfrutar de <br/> todas las funciones en Silk Bay!</p>

                {errorText.length > 0 && (<p className='error'>{errorText}</p>)}
                <Form method='post' action='/register' onSubmit={onSubmit} className="form">
                    <Input style={{color: usernameChecked ? "green" : "red"}} icon={UserIcon} type="text" placeholder="Nombre de Usuario" name="username" value={username} mutator={setUsername}/>
                    <Input icon={LockIcon} type="password" placeholder="Contraseña" name="password" value={password} mutator={setPassword}/>
                    <Input icon={LockIcon} type="password" placeholder="Confirmar Contraseña" name="confirmPassword" value={repeatPassword} mutator={setRepeatPassword}/>
                    <Button type={"secondary"}>Registrarse</Button>
                    
                    <div className="form-footer">
                        <small>¿Ya tienes cuenta?</small>
                        <Link to="/login" className='sign-link'>
                            Ingresar
                        </Link>
                    </div>
                </Form>
                
            </div>
        </>

    )
}