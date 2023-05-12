import React from "react";
import { Link } from "react-router-dom";
import { useCartHelpers } from "../contexts/CartContext";
import cart from "../assets/icon-cart.png";
import "./CartButton.css";
import Media from "react-media";
export default function CartButton() {
	const { getCartCount } = useCartHelpers();
	const count = getCartCount();
	return (
		<>
			<Media query={"(min-width: 768px)"}>
				<Link className="cart" to={"/cart"}>
					<span className="visually-hidden">Carrito de compras</span>
					<img aria-hidden="true" src={cart} alt="cart icon" />
					<span className="divisor" aria-hidden="true"></span>
					<p>{count}</p>
				</Link>
			</Media>
			<Media query={"(max-width: 768px)"}>
				<Link className="cart cart-mobile" to={"/cart"}>
					<img aria-hidden="true" src={cart} alt="cart icon" />
					<p>{count}</p>
				</Link>
			</Media>
		</>
	);
}
