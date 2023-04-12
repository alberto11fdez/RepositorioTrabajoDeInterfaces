import React from 'react'
import { getSingleProduct } from '../utils/db'
import {useLoaderData} from "react-router-dom";
export async function loader({params}){
    const product = await getSingleProduct(params.productId);
    return {product}
}

export default function Detail() {

    const  {product} = useLoaderData();
  return (
    <div>
        <div>{product.title}</div>
        <div>{product.price}</div>
    </div>
  )
}
