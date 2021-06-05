// Import CSS
import "./style.css";
// Handles code for weather app project
import { getWeather, processData } from "./searchModule.js";
import render from "./renderModule.js";

// Cache DOM
const searchBox = document.querySelector(".search-box");
const searchField = searchBox.querySelector("input");
const searchBtn = searchBox.querySelector("button");
const unitBox = searchBox.querySelector(".units-box");
const celsiusBox = unitBox.querySelector("#metric");
const fahrenheitBox = unitBox.querySelector("#imperial");

// Get user input
searchBtn.addEventListener("click", () => {
	// Get city name from search field
	const city = searchField.value;
	// Get specified units
	const units = unitBox.querySelector(".highlighted").id;
	// Submit input
	search(city, "ca", units);
	// Reset search field
	searchField.value = "";
});

// When celsius is clicked it will toggle between the two options
celsiusBox.addEventListener("click", (e) => {
	toggleUnits("imperial");
	toggleUnits(e.target.id);
});
// When fahrenheit is clicked it will toggle between the two options
fahrenheitBox.addEventListener("click", (e) => {
	toggleUnits(e.target.id);
	toggleUnits("metric");
});

// Load page with Edmonton, Canada's weather
const response = getWeather();
response.then(function (obj) {
	// Handle Promise
	const data = processData(obj);
	// Display header
	render.header(data.city, data.country, data.description, data.icon);
	// Display main content
	render.mainContent(
		data.temp,
		data.feelsLike,
		data.wind,
		data.humidity,
		data.pressure,
		data.sunrise,
		data.sunset,
		data.units
	);
	// Display footer
	render.footer();
});

/*** Functions ***/

/*
 * Function will search for a city's current weather
 * Parameters: accept a city, country and unit of measure.
 */
function search(city = "edmonton", country = "ca", units = "metric") {
	const response = getWeather(city, country, units);
	response.then(function (obj) {
		// Handle Promise
		const data = processData(obj);
		// Display header
		render.header(data.city, data.country, data.description, data.icon);
		// Display main content
		render.mainContent(
			data.temp,
			data.feelsLike,
			data.wind,
			data.humidity,
			data.pressure,
			data.units
		);
		// Display footer
		render.footer();
	});
}

// Toggle temperature unit input
function toggleUnits(id) {
	// Find the currently selected element and deselect it
	document.getElementById(id).classList.toggle("highlighted");
}
