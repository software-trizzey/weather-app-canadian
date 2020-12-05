// Module will render data for the weather app
import time from "./time.js";
import { getIcon } from "./giphyModule.js";

const render = (() => {
	// Cache DOM
	const container = document.getElementById("main");
	// Header content
	const locationBox = container.querySelector(".location");
	const descriptionBox = container.querySelector(".description");
	const iconBox = document.querySelector(".icon-box");
	// Main content
	const tempBox = container.querySelector(".current-temp");
	const detailsBox = container.querySelector(".details");
	// Footer content
	const timeBox = container.querySelector("#time");
	const dateBox = container.querySelector("#date");

	/*** Public Methods ***/

	// Render header of widget
	const header = (cityName, country, description, iconCode) => {
		_location(cityName, country);
		_description(description);
		_setIcon(iconCode);
	};

	// Render main content of widget
	const mainContent = (temp, feelsLike, wind, humidity, pressure, units) => {
		// Render temperature
		_temp(temp, units);
		// Render details
		_details(feelsLike, wind, humidity, pressure, units);
	};

	// Render current date and time to footer
	const footer = () => {
		_currentTime();
		_currentDate();
	};

	/*** PRIVATE METHODS ***/

	// Display city name
	const _location = (cityName, country) =>
		(locationBox.textContent = `${cityName}, ${country}`);

	// Display description of current weather
	const _description = (description) =>
		(descriptionBox.textContent = description);

	// Check specified unit type
	const _units = (input) => {
		//Create object of desired units
		// const unitsObj = {
		// 	// Metric
		// 	celsius: "℃",
		// 	km: "m/s",
		// 	// Imperial
		// 	fahrenheit: "℉",
		// 	miles: "m/h",
		// };

		// Return the appropriate object properties
		if (input === "metric") {
			return {
				temp: "℃",
				distance: "m/s",
			};
		} else if (input === "imperial") {
			return {
				temp: "℉",
				distance: "m/h",
			};
		} else {
			// Error
			return;
		}
	};

	// Display current weather giph
	const _setIcon = (iconCode) => {
		// Get icon
		const iconData = getIcon(iconCode);
		iconData.then(function (icon) {
			// Style icon
			icon.classList.add("icon");
			// Add to page
			iconBox.innerHTML = `<img src=${icon.src} class="icon" alt="Weather giph"/>`;
		});
	};

	// Display current temperature in specified units
	const _temp = (temp, units = "metric") => {
		// Get appropriate unit
		const obj = _units(units);
		tempBox.textContent = temp + obj.temp;
	};

	// Display extra data (add units variable that will change based on celsius/fahren?)
	const _details = (feelsLike, wind, humidity, pressure, units = "metric") => {
		// Determine the desired units
		const obj = _units(units);

		detailsBox.innerHTML = `
    <h3>Details</h3>
    <hr>
    <p id="feels-like">Feels like: <span>${feelsLike} ${obj.temp}</span></p>
    <p id="wind-speed">Wind: <span>${wind} ${obj.distance}</span></p>
    <p id="humidity">Humidity: <span>${humidity}%</span></p>
    <p id="pressure">Pressure: <span>${pressure} hPa</span></p>
    `;
	};

	// Set current time to page every minute
	function _currentTime() {
		setInterval(() => time.currentTime(timeBox), 1000);
	}

	// Display date and time
	function _currentDate() {
		dateBox.textContent = ` ${time.dateWithWeekday()}`;
	}

	return { header, mainContent, footer };
})();

export default render;
