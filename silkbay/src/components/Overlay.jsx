import React from 'react'


const overlayStyle = {
    position: "fixed",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.626)",
    top: 0,
    left: 0,
    zIndex: 2,
}

export default function Overlay({show, setShow, onClick}) { 
 
    if (!show){
        return;
    }
  return (
    <div style={overlayStyle} onClick={onClick}></div>
  )
}
