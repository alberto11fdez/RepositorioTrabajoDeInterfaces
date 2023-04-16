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

const API_URL = "http://localhost:3000/api/";

/**
 * Get the api url
 * @param {string} url the last bit of the url
 * @param {Object} params optionalQueryParams for the url, as a dict
 * @returns {string} the formmatted url of the api
 */
function api_url(url = "", params = {}) {
	const formattedApiUrl = new URL(API_URL + url);

	for (const key in params) {
		if (params[key]) {
			formattedApiUrl.searchParams.append(key, params[key]);
		}
	}

	return formattedApiUrl.href;
}

/**
 * An async function that returns a list of products
 * @returns {Promise<Product[]>} list of products
 */
export async function getAllProducts() {
	const res = await fetch(api_url("products"));
	if (res.status !== 200) {
		return [];
	}

	return await res.json();
}

export async function getProducts(q, limit = 3) {
	const res = await fetch(api_url("products", { limit, q }));
	if (res.status !== 200) {
		return [];
	}
	return await res.json();
}
/**
 * An async function that returns a single product by id
 * @param {string} id
 * @returns {Promise<Product | undefined>} the product or undefined
 */
export async function getSingleProduct(id) {
	const res = await fetch(API_URL + "products/" + id);

	if (res.status !== 200) {
		return undefined;
	}

	return await res.json();
}

/**
 * An async function that returns a list of users
 *
 * @param {string} username the username of the user
 * @returns {Promise<User | undefined>} the user to return
 */
export async function getUser(username) {
	const res = await fetch(API_URL + "user?username=" + username);
	if (res.status !== 200) {
		return undefined;
	}
	return await res.json();
}
