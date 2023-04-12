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
            cartProducts.push(product);
            return cartProducts;
        })
  }
  function isProductInCart(id){
    return cartProducts.find(product => product.id === id) !== -1;
  }

  const helpers = {
    emptyCart,
    addCartProduct,
    isProductInCart,
    setCartProducts
  }

  return (
    <cartProductsContext.Provider value={cartProducts}>
        <cartHelpersContext.Provider value={helpers}>
            {children}
        </cartHelpersContext.Provider>
    </cartProductsContext.Provider>
  )
}
