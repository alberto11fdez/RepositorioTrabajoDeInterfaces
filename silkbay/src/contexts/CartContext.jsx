import React, { useContext, useState } from 'react'

const cartPurchasesContext = React.createContext();

const cartHelpersContext = React.createContext();


export function useCartPurchases(){
    return useContext(cartPurchasesContext);
}

export function useCartHelpers(){
    return useContext(cartHelpersContext);
}

export default function CartContext({children}) {
  const [cartPurchases, setCartPurchases] = useState([]);
  
  function emptyCart(){
    setCartPurchases([]);
  }
  function addCartProduct(product){
        setCartPurchases((cartPurchases) => {
            return [...cartPurchases, {id: product.id, items: 1, product}];
        })
  }
  function removeProductFromCart(id){
    setCartPurchases((cartPurchases) => {
      return cartPurchases.filter(cartProduct => cartProduct.id !== id);
    })
  }
  function changePurchaseItemCount(purchaseId, newCount){
    setCartPurchases((cartPurchases) => {
      return cartPurchases.map((purchase) => {
          if(purchase.id === purchaseId){
            return {
              ...purchase,
              items: newCount
            }
          }
          return purchase;
      })
    })
  }
  function getCartCount(){
    return useCartPurchases().length;
  }
  function isProductInCart(id){
    const cartPurchases = useCartPurchases();

    if(cartPurchases.length === 0) return false;
    return cartPurchases.findIndex(product => product.id === id) !== -1;
  }

  const helpers = {
    emptyCart,
    addCartProduct,
    isProductInCart,
    setCartPurchases,
    removeProductFromCart,
    getCartCount,
    changePurchaseItemCount
  }

  return (
    <cartPurchasesContext.Provider value={cartPurchases}>
        <cartHelpersContext.Provider value={helpers}>
            {children}
        </cartHelpersContext.Provider>
    </cartPurchasesContext.Provider>
  )
}
