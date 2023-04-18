import React, { useState } from 'react'
import { useEffect } from 'react';
import { useUser } from '../contexts/AuthContext';
import { getPurchases } from '../utils/db';
import { useRestrictLogin } from '../utils/hooks';
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

  if(purchases.length === 0){
    return (
        <div className='purchases-page'>
            No se han realizado compras
        </div>
    )
  }
  console.log(purchases)
  return (
    <div className='purchases-page'>
      <h1 className='purchases-heading'> Tus compras</h1>
     <div className="purchases-list">
         {purchases.map(purchase => {
             return (
                 <div key={purchase.id}>
                     <h3>Compra del {purchase.createdAt.toDateString()}</h3>
                     <p>Total: {purchase.amount}</p>
                     <ul className='purchase-item-list'>
                         {purchase.PurchaseItems.map(purchaseItem => {
                             return <li key={purchaseItem.id}> {purchaseItem.product.title} - {purchaseItem.count}</li>
                         })}
                     </ul>
                 </div>
             )
         })}
     </div>
    </div>
  )
}
