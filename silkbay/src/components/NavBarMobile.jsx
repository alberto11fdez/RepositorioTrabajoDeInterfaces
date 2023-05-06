import React, { useState } from "react";
import SearchInput from "./SearchInput";

import "./NavBarMobile.css";
import menu from "../assets/white_hamburgue_icon.png";
import { Link } from "react-router-dom";
import { useAuthHelpers } from "../contexts/AuthContext";
import logoutIcon from "../assets/icon-signout.png";
import { useCartHelpers } from "../contexts/CartContext";
export default function NavBarMobile() {
	const [showItems, setShowItems] = useState(false);
    const {logout, isUserLogged} = useAuthHelpers();
    const isLogged = isUserLogged();
    console.log(isLogged)
    const {emptyCart} = useCartHelpers();
	return (
		<div className="navbar-mobile">
			<ul
				className="nav-items-mobile"
				style={{ right: showItems ? "0" : "-100%" }}
			>
				<button
					className="nested-menu-button"
					onClick={() => setShowItems(false)}
				>
					<img
						src={menu}
						alt="Menu"
						aria-roledescription="icono menu hamburguesa"
					/>
				</button>
				{isLogged ? (
					<>
						<li>
							<Link to="/user" onClick={() => setShowItems(false)}>
								Tu cuenta
							</Link>
						</li>
						<li>
							<Link to="/user/purchases" onClick={() => setShowItems(false)}>
								Tus pedidos
							</Link>
						</li>
						<li>
							<button
								className="signout-btn"
								onClick={() => {
									logout();
									emptyCart();
								}}
							>
								<p>Cerrar sesión</p>
								<img src={logoutIcon} alt="" />
							</button>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/login">Ingresar</Link>
						</li>
						<li>
							<Link to="/Register">Registrarse</Link>
						</li>
					</>
				)}
			</ul>
			<SearchInput />
			<button className="menu-button" onClick={() => setShowItems(true)}>
				<img
					src={menu}
					alt="Menu"
					aria-roledescription="icono menu hamburguesa"
				/>
			</button>
		</div>
	);
}
