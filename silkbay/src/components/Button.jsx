import React from 'react'

const PRIMARY = {
    backgroundColor: "#00C896"
}
const SECONDARY = {
    backgroundColor: "#4B04E1"
}
const ALT = {
    backgroundColor: "#FF5555"
}
const buttonStyles = {
    border: "none",
    padding: ".6rem 2rem",
    borderRadius: "9px",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.25rem",
    cursor: "pointer",
}

export default function Button({onClick, type, children=[], text, styles={}}) {
  let variant;
    switch(type){
        case "primary":
            variant = PRIMARY;
            break;
        case "secondary":
            variant = SECONDARY;
            break;
        case "alt":
            variant = ALT;
            break;
        default:
            variant = PRIMARY;
            break;
    }

  return (
    <button onClick={onClick} style={{...buttonStyles,...styles, ...variant}}>
        { ...children}
        {text}
    </button> 
  )
}
