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
const styles = {
    borderRadius: "9px",
    minWidth: "5rem",
    minHeight: "2rem",
}

export default function Button({onClick, type, children}) {
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
    <button onClick={onClick} style={{...styles, ...variant}}>
        {...children}
    </button> 
  )
}
