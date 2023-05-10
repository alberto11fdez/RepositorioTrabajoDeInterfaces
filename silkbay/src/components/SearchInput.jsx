import React from 'react'
import "./SearchInput.css";
import searchIcon from "../assets/icon-search-dark.png";
import SearchItem from './SearchItem';
import { useState } from 'react';
import { useDebounce } from '../utils/hooks';
import { getProducts } from '../utils/db';
import { useEffect } from 'react';
import Overlay from './Overlay';
 

const MOCK_SEARCHES = [
  {
		"id": 1,
		"title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
		"image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
	},
	{
		"id": 2,
		"title": "Mens Casual Premium Slim Fit T-Shirts ",
		"image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
	},
]
export default function SearchInput() {
  const [searchText, setSearchText] = useState("");
  const [searches, setSearches] = useState([]);
  const [focus, setFocus] = useState(false);
 
  function lookForProducts() {
 
    if(searchText === "") return;
    
    getProducts(searchText, 5).then((searchedProducts) => {
 
      setSearches(searchedProducts.map((product) => ({id: product.id, title: product.title, image: product.image})))
    })
  }
  const {clear} = useDebounce(lookForProducts, 800, [searchText])
  
  const exitSearch = () => {
    clear();
    setFocus(false);
    setSearches([]);
  }
  
  function onKey(ev){
      if(ev.key === "Enter"){
        clear();
        lookForProducts();
      }
  }


  return (
    <>
      <Overlay onClick={() => exitSearch()} show={focus}/>
      <div className="search-wrapper">
      
        <div className='search-input-container'>
          <input role="search" aria-label="Buscar producto" title='Buscar' onKeyDown={onKey} onFocus={() => setFocus(true)} type="text" placeholder='¿Qué estás buscando?' className='search-input' value={searchText} onChange={(ev) => setSearchText(ev.target.value)}/>
          <button className='search-button' onClick={() => { clear(); setFocus(true); lookForProducts()}}>
              <img src={searchIcon} alt="icono para la busqueda" className='search-icon' longdesc="Este es el icono de busqueda"/>

          </button>
        </div>

        {
          searches.length > 0 && (
        <div className='search-box'>
           
          {searches.map((search) => <SearchItem onClick={() => exitSearch()} id={search.id} image={search.image} text={search.title} key={search.id}/>)}
        </div>)
        }
      </div>

    </>
  )
}
