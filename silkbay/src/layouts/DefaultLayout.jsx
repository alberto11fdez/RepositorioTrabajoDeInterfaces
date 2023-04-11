import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

const outletStyle = {
  minHeight: "100%",
  minWidth: "100%",
}
const mainStyle = {
    display: "grid",
    gridTemplateRows: "max-content 1fr max-content",
    gridTemplateColumns: "1fr", 
    minHeight: "100vh"
}
export default function DefaultLayout() {
  return (
    <main style={mainStyle}>
      <NavBar/>
      <div style={outletStyle}>
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}
