import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useCartHelpers } from '../contexts/cartContext'
import { CATEGORY, getAllProducts } from '../utils/db'
import "./Home.css"


const ALL = "Todo"
const CLOTHES = "Ropa"
const TECH = "Tecnología"
const JEWELRY = "Joyeria";

const FILTERS = [ALL, CLOTHES, TECH, JEWELRY]

export default function Home() {
  /**
   * @type {[import('../utils/db').Product[], React.Dispatch<import('../utils/db').Product>]} state
   */
  const [products, setProducts] = useState([]);

    /**
   * @type {[string, React.Dispatch<string>]} state
   */
  const [currentFilter, setFilter] = useState(ALL);

  useEffect(() => {
      getAllProducts().then((products) => {
          setProducts(products)
      })
  }, []) 
   
  /**
   * @type {import('../utils/db').Product[]}
   */
  let displayedProducts;

  switch(currentFilter){
    case ALL:
      displayedProducts = products
      break;
    case CLOTHES:
      displayedProducts = products.filter((product) => product.category == CATEGORY.menSClothing || product.category == CATEGORY.womenSClothing);
      break;
    case TECH:
      displayedProducts = products.filter((product) => product.category == CATEGORY.electronics);
      break;
    case JEWELRY:
      displayedProducts = products.filter((product) => product.category == CATEGORY.jewelery);
      break;
    default:
      displayedProducts = products
      break;
  }
  return (
    <div className='home'>
      <h1>Nuestra selección de productos</h1>
      
      <div className="content-wrapper">
        <div className='filters'>
          {FILTERS.map((filter) => {
            return <button key={filter} className={filter == currentFilter ? "active-filter" : ""} onClick={() => setFilter(filter)}>{filter}</button>
          })} 
        </div>
        <span className='divisor'></span>
        <div className='products'> 

            {
              displayedProducts.length > 0 ? (
                <div className='product-grid'>
                  {displayedProducts.map((product) => <Card key={product.id + product.title} {...product}/> )}
                </div>
              ) :
              (
                <h3>No hay productos para mostrar</h3>
              )
            }
           
        </div>
      </div>
    </div>
  )
}
