import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Media from 'react-media'
import NavBarMobile from '../components/NavBarMobile'

const outletStyle = {
  minHeight: "100%",
  minWidth: "100%",

}
const mainStyle = {
    display: "grid",
    gridTemplateRows: "max-content 1fr max-content",
    gridTemplateColumns: "1fr", 
    minHeight: "100vh",
    overflowX: "hidden",
}
export default function DefaultLayout() {
  return (
    <main style={mainStyle}>
      <Media query="(min-width: 768px)">
      <NavBar/>
      </Media>
      <Media query="(max-width: 768px)">
      <NavBarMobile/>
      </Media>
      <div style={outletStyle}>
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}
