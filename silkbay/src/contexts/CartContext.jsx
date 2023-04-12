import React, { useContext, useState } from 'react'

const cartProductsContext = React.createContext();

const cartHelpersContext = React.createContext();


export function useCartProducts(){
    return useContext(cartProductsContext);
}

export function useCartHelpers(){
    return useContext(cartHelpersContext);
}

export default function CartContext({children}) {
  const [cartProducts, setCartProducts] = useState([]);
  
  function emptyCart(){
    setCartProducts([]);
  }
  function addCartProduct(product){
        setCartProducts((cartProducts) => {
            return [...cartProducts, product];
        })
  }
  function removeProductFromCart(id){
    setCartProducts((cartProducts) => {
      return cartProducts.filter(cartProduct => cartProduct.id !== id);
    })
  }

  function getCartCount(){
    return useCartProducts().length;
  }
  function isProductInCart(id){
    const cartProducts = useCartProducts();

    if(cartProducts.length === 0) return false;
    return cartProducts.findIndex(product => product.id === id) !== -1;
  }

  const helpers = {
    emptyCart,
    addCartProduct,
    isProductInCart,
    setCartProducts,
    removeProductFromCart,
    getCartCount
  }

  return (
    <cartProductsContext.Provider value={cartProducts}>
        <cartHelpersContext.Provider value={helpers}>
            {children}
        </cartHelpersContext.Provider>
    </cartProductsContext.Provider>
  )
}
