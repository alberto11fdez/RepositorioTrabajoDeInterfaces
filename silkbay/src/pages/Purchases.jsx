import React, { useState } from 'react'
import { useEffect } from 'react';
import { useUser } from '../contexts/AuthContext';
import { getPurchases } from '../utils/db';
import { useRestrictLogin } from '../utils/hooks';
import Heading from "../components/Heading"
import "./Purchases.css"

export function loader({request}){
    return "";
}
export default function Purchases() {
  /** @type {[import('../utils/db').Purchase[], React.Dispatch<import('../utils/db').Purchase[]>]} */
  const [purchases, setPurchases] = useState([]);
  const user = useUser();
  const shouldRestrict = useRestrictLogin();
  useEffect(() => {
    getPurchases(user.id).then((data) => setPurchases(data))
  }, [])

  if(shouldRestrict){
    return;
  }

  console.log(purchases)
  return (
    <div className='purchases-page'>
      <Heading style={{paddingLeft:0}}>Tus compras</Heading>
      {purchases.length === 0 ? (
      <h2 className="no-purchases-title"> 
        No has hecho compras...aún...
      </h2>
      ): (
         <div className="purchases-list">
         {purchases.map(purchase => {
             return (
                 <div key={purchase.id} className="purchase-item">
                     <h3 className="purchase-item-title">Compra del {purchase.createdAt.toDateString()}</h3>
                     <p className="purchase-item-total">Total: {purchase.amount}</p>
                     <ul className='purchase-item-list'>
                         {purchase.PurchaseItems.map(purchaseItem => {
                             return <li className="product-item" key={purchaseItem.id}> {purchaseItem.product.title} - {purchaseItem.count} items - {purchaseItem.product.price * purchaseItem.count} €</li>
                         })}
                     </ul>
                 </div>
             )
         })}
     </div>
      )}
    
    </div>
  )
}
