 
import React, { useEffect } from "react";
import CartCard from "../components/CartCard";
import Card from "../components/Card";
import Button from "../components/Button"
import leafAnim from "../assets/empty-card.gif";
import partyImage from "../assets/party.png";
import "./Cart.css";
import { useState } from "react";
import { createPurchase, getProducts } from "../utils/db";
import { useCartHelpers, useCartPurchases } from "../contexts/CartContext";
import { Link, useNavigate, useSubmit } from "react-router-dom";
import { useUser } from "../contexts/AuthContext";
import Modal, { useModal } from "../components/Modal";
import Heading from "../components/Heading";

export async function action({request}){
  const data = await request.text();
  console.log(data);
  return "";
}

export default function Cart() {

  const purchases = useCartPurchases();
  const user = useUser();
  const {removeProductFromCart, changePurchaseItemCount, emptyCart} = useCartHelpers();
  // const purchases = []
  const [relatedProducts, setRelatedProducts] = useState([])
  const [show, setShow] = useModal();
  const navigate = useNavigate();
  useEffect(() => {
      getProducts().then((products) => setRelatedProducts(products));
  }, [])
  function submitPurchase(){ 
    const purchaseItems = purchases.map((purchase) => {
      return {
         count: purchase.items,
         productId: purchase.product.id
      }
    })
    const finalAmount = purchases.reduce((sum, next) => sum + next.product.price * next.items, 0);
    const submittedPurchase = {
      userId: user.id,
      purchaseItems,
      amount: finalAmount
    }
    createPurchase(submittedPurchase).then((res) => {
        emptyCart();
        setShow(true);
    });

  }
  function onPurchaseRemove(purchaseId){
      removeProductFromCart(purchaseId);
  }

  function onPurchaseCountChange(purchaseId, count){
      changePurchaseItemCount(purchaseId, count)
  }

  if (purchases.length === 0){
    return (
      <div className="cart-page">
        <Modal show={show} setShow={setShow} title="¡La compra se ha realizado con éxito!" image={partyImage} buttons={[
        <Link to="/home">
          <Button>
            Seguir comprando
          </Button>
        </Link>
      ]}/>
        <img className="empty-animation" src={leafAnim} alt="" />
        <p className="empty-text">Parece que no hay nada en tu carrito... <br />
                            ¡Explora nuestra selección de productos destacados!</p>
        <div className="related-products">
          {relatedProducts.map((product) => <Card key={product.id} {...product}/>)}
        </div>
      </div>
    )
  }

	return (
		<div className="cart-page">
      
			<div className="cart-page-wrapper">
				<div className="cart-header">
					<Heading>Revisa tus compras</Heading>
				</div>
				<div className="purchases">
					{
            purchases.map((purchase) => <CartCard key={purchase.id} purchase={purchase} onItemsChange={onPurchaseCountChange} onRemove={onPurchaseRemove}/>)
          }
				</div>
				<div className="purchase-brief">
					<div className="total-info">
						<p>Total:</p>
            <p>{purchases.reduce((sum, next) => sum + next.product.price * next.items, 0)} €</p>
					</div>
          <Button onClick={submitPurchase} type="secondary" styles={{width: "10rem", height: "2.2rem", padding: "0", fontSize: "1.15rem" }}>
            Pagar
          </Button>
				</div>
			</div>
		</div>
	);
}
