import React from 'react'
import { Link } from 'react-router-dom'


const searchItemStyles = {
    display: "flex",
    height: "5.688rem",
    width: "100%",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
}

const itemImageStyle = {
    width: "3.813rem",
    height: "3.813rem",
    objectFit: "contain",
}

const textStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
 
    color: "black",
 
}
export default function SearchItem({id, image, text, onClick}) {

  return (
    <Link to={`/products/${id}`} style={searchItemStyles} onClick={onClick}>
        <img src={image} alt=""  style={itemImageStyle}/>
        <p style={textStyle}>{text}</p>
    </Link>
  )
}
