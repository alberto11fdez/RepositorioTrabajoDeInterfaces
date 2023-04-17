 
import React, { useEffect } from "react";
import CartCard from "../components/CartCard";
import Card from "../components/Card";
import Button from "../components/Button"
import leafAnim from "../assets/empty-card.gif";
import "./Cart.css";
import { useState } from "react";
import { getProducts } from "../utils/db";
import { useCartHelpers, useCartPurchases } from "../contexts/CartContext";
const MOCK_PURCHASE = {
	items: 1,
	product: {
		id: 1,
		title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
		price: 109.95,
		description:
			"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
		category: "men's clothing",
		image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
	},
	id: 1,
};

export default function Cart() {

  const purchases = useCartPurchases();
  const {removeProductFromCart, changePurchaseItemCount} = useCartHelpers();
  // const purchases = []
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
      getProducts().then((products) => setRelatedProducts(products));
  }, [])
  if (purchases.length === 0){
    return (
      <div className="cart-page">
        <img className="empty-animation" src={leafAnim} alt="" />
        <p className="empty-text">Parece que no hay nada en tu carrito... <br />
                            ¡Explora nuestra selección de productos destacados!</p>
        <div className="related-products">
          {relatedProducts.map((product) => <Card key={product.id} {...product}/>)}
        </div>
      </div>
    )
  }

  function onPurchaseRemove(purchaseId){
      removeProductFromCart(purchaseId);
  }

  function onPurchaseCountChange(purchaseId, count){
      changePurchaseItemCount(purchaseId, count)
  }

	return (
		<div className="cart-page">
			<div className="cart-page-wrapper">
				<div className="cart-header">
					<h1>Revisa tus compras</h1>
					<span className="cart-divisor" />
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
          <Button type="secondary" styles={{width: "10rem", height: "2.2rem", padding: "0", fontSize: "1.15rem" }}>
            Pagar
          </Button>
				</div>
			</div>
		</div>
	);
}
