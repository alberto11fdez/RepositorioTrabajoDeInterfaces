import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Button from "../components/Button"
import Modal, { useModal } from '../components/Modal'
import { useCartHelpers } from '../contexts/cartContext'
import { CATEGORY, getAllProducts } from '../utils/db'
import "./Home.css"
import starsIcon from "../assets/stars.png";
import { Link, useActionData, useLoaderData, useLocation, useNavigation, useSearchParams } from 'react-router-dom'
import { useAuthHelpers, useUser } from '../contexts/AuthContext'
import Heading from '../components/Heading'
 

export const ALL = "Todo"
export const CLOTHES = "Ropa"
export const TECH = "Tecnología"
export const JEWELRY = "Joyeria";

const FILTERS = [ALL, CLOTHES, TECH, JEWELRY];

export async function loader({request, response}){
  return "";
}
export default function Home() {
  /**
   * @type {[import('../utils/db').Product[], React.Dispatch<import('../utils/db').Product>]} state
   */
  const [products, setProducts] = useState([]);

    /**
   * @type {[string, React.Dispatch<string>]} state
   */
  const [currentFilter, setFilter] = useState(ALL);

  

  const [show, setShow] = useModal();
  
  const {search} = useLocation();
  const {setUser} = useAuthHelpers();
 
 

  useEffect(() => {
 
      getAllProducts().then((products) => {
          setProducts(products)
      })
      const queryParams = new URLSearchParams(search)  
      if(queryParams.has("filter")){
        const queryFilter = queryParams.get("filter");
        if(FILTERS.findIndex((val) => val === queryFilter) !== -1){
          setFilter(queryFilter);
        }
      }
  }, []) 
   
  function onCardAdd(){
    setShow(true)
  }
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
      <Modal title="Ingresa para poder comprar hermosos productos" image={starsIcon} show={show} setShow={setShow} buttons={(
        <>
        <Link to="/login">
          <Button>
            Ingresar
          </Button>
        </Link>
        <span className='modal-divisor'/>
        <Link to="/signup">
        <Button type="alt"> 
            Crear cuenta          
        </Button>
        </Link>
        </>
      )}/>
      <Heading>Nuestra selección de productos</Heading>
      
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
                  {displayedProducts.map((product) => <Card onAddHook={onCardAdd} key={product.id + product.title} {...product}/> )}
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
