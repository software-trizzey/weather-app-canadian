// Module will search for a specified city using its name and country code [ISO 3166]

// Project API_KEY
const apiKey = "3cadde1d3ac06f0b7c8aa5362b43622d";

export async function getWeather(
	city = "edmonton",
	country = "ca",
	units = "metric"
) {
	try {
		const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}
      &appid=${apiKey}&units=${units}`;
		// Call api
		const response = await fetch(apiCall, { mode: "cors" });
		// Get json
		const weatherData = await response.json();
		// add a custom unit property to data object
		weatherData.units = units;

		return weatherData;
	} catch (error) {
		console.error("Whoops something went wrong!", error);
	}
}

// Accept an API object and create new object with following data
export function processData(data) {
	return {
		city: data.name,
		country: data.sys.country,
		cityID: data.id,
		temp: parseInt(data.main.temp),
		feelsLike: parseInt(data.main.feels_like),
		description: data.weather[0].description,
		wind: data.wind.speed,
		humidity: data.main.humidity,
		pressure: data.main.pressure,
		icon: data.weather[0].main,
		units: data.units,
	};
}
