import React from 'react'
import { Outlet } from 'react-router-dom'
import "../pages/register.css"

export default function RegisterLayout() {
  return (
    <div className='register-wrapper'>
        <Outlet/>
    </div>
  )
}