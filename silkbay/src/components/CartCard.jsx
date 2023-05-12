import React from "react";
import { useState } from "react";
import TrashCan from "../assets/icon-delete.png";
import "./CartCard.css";
import Button from "../components/Button";
/**
 * A purchase
 * @typedef {Object} purchase
 * @property {import('../utils/db').Product} purchase.product the product that this purchase is using
 * @property {number} purchase.items the number of items that the user is buying
 * @property {string} purchase.id the id of the purchase, is the same one as the product
 */

/**
 * @param {{purchase: purchase, onRemove: function, onItemsChange: function}}
 * @returns
 */

const SLICE_SIZE = 280;
export default function CartCard({ purchase, onRemove, onItemsChange }) {
	const { product, items } = purchase;
	const [itemsCount, setItemsCount] = useState(items);

	function onItemsCountChange(ev) {
		const number = parseInt(ev.target.value);

		if (number && number < 100) {
			setItemsCount(number);
			onItemsChange(purchase.id, number);
		}
	}
	function onButtonClick(number) {
		if (number < 1) onRemove(purchase.id);
		if (number > 100) return;
		setItemsCount(number);
		onItemsChange(purchase.id, number);
	}

	return (
		<div className="cartCard">
			<img className="purchase-img" src={product.image} alt={product.title} />
			<div className="info-wrapper">
				<p className="product-title">{product.title}</p>
				<p className="description-title">Descripción</p>
				<p className="description">
					{product.description.length > SLICE_SIZE
						? product.description.slice(0, SLICE_SIZE) + "..."
						: product.description}
				</p>
			</div>
			<div className="controls">
				<div className="top-controls">
					<label htmlFor="items-input">Items</label>
					<div className="top-controls-inner">
						<Button
							type={"secondary"}
							styles={{
								width: "2.5rem",
								height: "2rem",
								padding: "0",
								fontSize: "1rem",
							}}
							onClick={() => onButtonClick(itemsCount - 1)}
						>
							{" "}
							-{" "}
						</Button>
						<input
							id="items-input"
							pattern="^[0-9]*$"
							minLength={0}
							maxLength={100}
							value={itemsCount}
							onChange={onItemsCountChange}
						/>
						<Button
							type={"secondary"}
							styles={{
								width: "2.5rem",
								height: "2rem",
								padding: "0",
								fontSize: "1rem",
							}}
							onClick={() => onButtonClick(itemsCount + 1)}
						>
							{" "}
							+{" "}
						</Button>
					</div>

					<p className="product-price" role={"presentation"}>
						{product.price * itemsCount}€
					</p>
				</div>
				<div className="bottom-controls">
					<button
						className="remove-button"
						onClick={() => onRemove(purchase.id)}
					>
						<p>Remover</p>
						<img src={TrashCan} alt="trash can icon" />
					</button>
				</div>
			</div>
		</div>
	);
}
