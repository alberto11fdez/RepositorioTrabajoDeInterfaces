import React from 'react'
import "./Heading.css"
 
export default function Heading({style, children}) {
  return (
    <div className='heading-wrapper' style={style}>
        <h1 className='heading'>{children}</h1>
        <span className='heading-divider'/>
    </div>
   
  )
}
