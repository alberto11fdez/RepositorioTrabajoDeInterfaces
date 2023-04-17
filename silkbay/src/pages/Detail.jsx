import React from 'react'
import { CATEGORY, getSingleProduct } from '../utils/db'
import {Link, useLoaderData} from "react-router-dom";
import Button  from "../components/Button";
import "./Detail.css"
import { CLOTHES, JEWELRY, TECH } from './Home';
import { useCartHelpers } from '../contexts/CartContext';

export async function loader({params}){
    const product = await getSingleProduct(params.productId);
    if (product == undefined){
      throw new Response("Not found", {status: 404, statusText: "Producto no encontrado"});
    }
    return {product}
}

export default function Detail() {
  /**
   * @type {{product: import('../utils/db').Product}}
   */
  const  {product} = useLoaderData();
  const {addCartProduct, isProductInCart, removeProductFromCart} = useCartHelpers();
  const isInCart = isProductInCart(product.id);
  let filterRoute = ""

  switch (product.category){
    case CATEGORY.electronics:
      filterRoute += TECH
      break;
    case CATEGORY.jewelery:
      filterRoute += JEWELRY
      break;
    case CATEGORY.menSClothing:
      filterRoute += CLOTHES
      break;
    case CATEGORY.womenSClothing:
        filterRoute += CLOTHES
      break;    
    default:
      break;
  }
  return (
    <div className='detail'>

      <div className='breadcrumbs'>
        <Link to="/">
          Home
        </Link>
        {">"}
        <Link to={`/home?filter=${filterRoute}`}>
          {filterRoute}
        </Link>
        {">"}
        <p>
          {product.title}
        </p>
  
      </div>

      <div className='detail-body-wrapper'>
        <div className='detail-img'>
          <img src={product.image} alt="" />
        </div>

        <div className='detail-content'>
            <h1>{product.title}</h1>
            <div className='purchase-info'>
              <p>{product.price}€</p>
              {isInCart ? 
              <Button onClick={() => removeProductFromCart(product.id)} styles={{backgroundColor: "gray"}} text="Remover"/> 
              : 
              <Button onClick={() => addCartProduct(product)} type="secondary" text="Comprar" styles={{padding: ".5rem 1rem"}}/>}
              
            </div>
          <p className='product-description'>{product.description}</p>
        </div>
      </div>
    </div>
  )
}
