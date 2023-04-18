import React from 'react'
import help from "../pages/Help"

const styles = {
    backgroundColor: "#00C896",
    width: "100%",
    height: "6.125rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
}



const textStyle = {
    fontSize: "0.813rem",
    color: "rgb(240, 240, 240)",
}

export default function Footer() {
  return (
    <div style={styles}>
        <p style={textStyle}>Silkbay® 2023</p>
        <p style={textStyle}>All Rights Reserved</p>
        <a href="../Help">¿Necesitas ayuda?</a>
    </div>
    
  )
}
