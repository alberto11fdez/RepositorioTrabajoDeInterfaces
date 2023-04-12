import products from "./products_test.json";
import users from "./users_test.json";

/**
 * A Category
 * @enum { string }
 */

export const CATEGORY = {
	electronics: "electronics",
	jewelery: "jewelery",
	menSClothing: "men's clothing",
	womenSClothing: "women's clothing",
};
/**
 * A product
 * @typedef {object} Product
 * @property {number} id
 * @property {string} title
 * @property {number} price
 * @property {string} description
 * @property {CATEGORY} category
 * @property {string} image
 */

/**
 * A name
 * @typedef {object} Name
 * @property {string} firstname
 * @property {string} lastname
 */

/**
 * An user
 * @typedef {object} User
 * @property {number} id
 * @property {string} username
 * @property {string} password
 * @property {Name} name
 */

/**
 * An async function that returns a list of products
 * @returns {Promise<Product[]>} list of products
 */
export async function getAllProducts() {
	return products;
}
/**
 * An async function that returns a single product by id
 * @param {string} id
 * @returns {Promise<Product | undefined>} the product or undefined
 */
export async function getSingleProduct(id) {
	console.log(id);
	console.log(products);
	return products.find((product) => product.id == id);
}

/**
 * An async function that returns a list of users
 *
 * @param {string} username the username of the user
 * @returns {Promise<User | undefined>} the user to return
 */
export async function getUser(username) {
	const user = users.find((user) => user.username == username);
	return user;
}
