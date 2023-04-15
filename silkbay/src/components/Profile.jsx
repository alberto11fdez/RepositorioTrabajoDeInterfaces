import React from 'react'
import User_Icon from '../assets/icon_user.png'
export default function(props){
    return(
        <>
        <div className='user_data'>
            <h1 className='my_account'>Mi cuenta</h1>
            <div class="card" style="width: 50rem;">
                <h2 className='data_title'>Datos</h2>
                <img src={User_Icon} alt="User image" className='user-icon'/>
                <p className='user_name'>Nombre: {props.user}</p>
            </div>
        </div>
        <div className='user_orders'>
            <h2 className='orders_title'>Historial de pedidos</h2>
        </div>
        </>
    );
}