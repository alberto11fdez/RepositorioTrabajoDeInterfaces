import React, { useEffect } from "react";
import User_Icon from "../assets/icon-user.png"
import "./User.css"
import { getProducts } from "../utils/db";
import { useState } from "react";
import Card from "../components/Card";
import { useUser } from '../contexts/AuthContext';




export default function(){
    const [relatedProducts, setRelatedProducts] = useState([])
    useEffect(() => {
     getProducts().then((products) => setRelatedProducts(products));
    }, [])
    const user = useUser();
    return(
        <>
        <div className='user_data'>
            <h2 className='my_account'>Mi cuenta</h2>
                <h1 className='data_title'>Datos</h1>
                <img src={User_Icon} alt="User image" className='user-icon'/>
                <p className='user_name'>Nombre: {user.username} </p>
        </div>
        <h2 className='orders_title'>Historial de pedidos</h2>
        <div className='user_orders'>
            {relatedProducts.map((product) => <Card key={product.id} {...product}/>)}
        </div>
        </>
    );
}