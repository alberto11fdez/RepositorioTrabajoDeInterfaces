import React from 'react'
import "./Input.css";
 
export default function Input({icon, mutator,...props}) {

    return (
      <div className='input-wrapper'>
        <input className='default-input' onChange={(ev) => mutator(ev.target.value)} {...props}/>
        <img src={icon} alt="input icon" className='input-icon'/>
      </div>
    
  )
}
