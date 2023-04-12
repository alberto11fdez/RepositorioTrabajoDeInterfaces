import React from 'react'
import { Outlet } from 'react-router-dom'
import "../pages/login.css"

export default function AuthLayout() {
  return (
    <div className='login-wrapper'>
        <Outlet/>
    </div>
  )
}
