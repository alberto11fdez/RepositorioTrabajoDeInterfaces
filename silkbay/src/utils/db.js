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
 * A purchaseItem
 * @typedef {object} PurchaseItem
 * @property {number} id
 * @property {Product} product
 * @property {number} count
 */
/**
 * A purchase
 * @typedef {object} Purchase
 * @property {number} id
 * @property {number} amount
 * @property {Date} createdAt
 * @property {PurchaseItem[]} PurchaseItems
 */

//const API_URL = "http://localhost:3000/api/";
const API_URL = "https://grad-mix-updated-sc.trycloudflare.com/api/";

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

/**
 * An async function that checks if an username has been taken
 *
 * @param {string} username the username to compare
 * @returns {Promise<boolean>} the result of the check
 */
export async function checkUsernameTaken(username) {
	const res = await fetch(api_url("user/check"), {
		body: JSON.stringify({ username }),
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (res.status !== 200) {
		return false;
	}
	const json = await res.json();
	return json.isTaken;
}
/**
 * An async function that creates a user
 * @param {FormData} userData the form encoded user data
 * @returns {Promise<User>} the user that was created
 */
export async function createUser(userData) {
	const res = await fetch(api_url("user"), {
		method: "post",
		body: JSON.stringify(Object.fromEntries(userData)),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.status !== 200) {
		throw Error("Something happened while creating the user");
	}

	return await res.json();
}

/**
 * An async function that creates a purchase
 * @param {Purchase} purchase the purchase to submit
 * @returns {Purchase} the purchase created
 */

export async function createPurchase(purchase) {
	const res = await fetch(api_url("purchase"), {
		method: "post",
		body: JSON.stringify(purchase),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw Error("Something happend while creating the purchase");
	}

	return await res.json();
}

/**
 * An async function that gets all the purchases of a single user
 * @param {number} userId the user id
 * @returns {Purchase[]} all the purchases of the user
 */
export async function getPurchases(userId) {
	const res = await fetch(api_url("purchase/" + userId));

	if (!res.ok) {
		return [];
	}

	const jsonData = await res.json();

	return jsonData.map((item) => ({
		...item,
		createdAt: new Date(item.createdAt),
	}));
}
