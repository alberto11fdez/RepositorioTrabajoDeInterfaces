import React from 'react'
import "./SearchInput.css";
import searchIcon from "../assets/icon-search-dark.png";
export default function SearchInput() {
  return (
    <div className='search-input-container'>
        <input type="text" placeholder='¿Qué estás buscando?' className='search-input'/>
        <button className='search-button'>
            <img src={searchIcon} alt="" className='search-icon'/>
        </button>
    </div>
  )
}
