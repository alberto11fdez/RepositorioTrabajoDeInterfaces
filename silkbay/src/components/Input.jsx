import React from 'react'
const style = {
    padding: '2%',
    margin: '3%',
    width: '50%'
}

export default function Input(props) {
 
    return (
    <input type={props.type} placeholder={props.placeholder} style={style}/>
    
  )
}
