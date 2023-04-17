import React, { useState } from 'react'
import "./Modal.css"
import iconX from "../assets/icon-x.png";
import Overlay from './Overlay';

/**
 * Hook for modal usage
 * @returns {[boolean, React.Dispatch<boolean>]} the state and the distpacher
 */
export function useModal(){
    const [show, setShow] = useState(false);
    return [show, setShow];
}
export default function Modal({show, setShow, image, title, buttons}) {

    if(!show){
        return
    }
  return (

    <>
    <Overlay show={true} onClick={() => setShow(false)}/>
        <div className="modal-wrapper">
            
            <button className='x-button' onClick={() => setShow(false)}><img src={iconX} alt="X button" /></button>
            <div className='modal-body'>
                <div className='modal-header'>
                    <img src={image} alt="Modal image" />
                </div>
                <div className='modal-title'>
                    <p className='title'>{title}</p>
                </div>
                <div className='modal-controls'>
                    {buttons}
                </div>
            </div>
        </div>
    </>

  )
}
