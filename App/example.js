//Conecta con Fakestore API
const url = "https://fakestoreapi.com/products";

let plantilla = document.getElementById("comercio");
let filterInput = document.getElementById("filter");    
//Obtiene los datos de la API
const getData = async (url) => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

//Muestra los datos de la API
const showData = async (url) => {
	const data = await getData(url);
	console.log(data);
	data.forEach((element) => {
		let plantilla = document.getElementById("comercio").content.cloneNode(true);
		plantilla.querySelector("[name=titulo]").innerHTML = element.title;
		plantilla.querySelector("[name=precio]").innerHTML = "$" + element.price;
		plantilla.querySelector("[name=imagen]").src = element.image;
		document.getElementById("lista").appendChild(plantilla);
	});
};
let filter = document.querySelector("#filter");
filter.addEventListener("change", () => {
	let filterValue = filter.value;
	console.log(filterValue);
	switch (filterValue) {
		case "1":
			document
				.querySelectorAll("[name=card]")
				.forEach((element) => element.remove());
			showData(url + "/category/men's%20clothing");
	}
});

showData(url);
