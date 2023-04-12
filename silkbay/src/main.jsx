import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import AuthContext from './contexts/AuthContext'
import CartContext from './contexts/CartContext'
 
import './index.css'
import Router from './Router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartContext>
      <AuthContext>
        <RouterProvider router={Router}/>
      </AuthContext>
    </CartContext>
  </React.StrictMode>,
)
