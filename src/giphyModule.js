// Module will get specfied weather gif from giphy

// Weather condition ID's
const clear = "Xev6MDHoxXrUAQZDMa";
const rain = "kBfL5cuu4bj4rr6GN8";
const thunderStorm = "Q8bCsT2A4cuVM8C93X";
const cloudy = "TercUvhYRPkmkDUNZk";
const snow = "KAdwIAgwyWl4R6DFtA";
const misc = "3NeU6yW7Oo33nDUTlg";

// Accept an icon category, determine proper ID and then fetch giph
export async function getIcon(category) {
	try {
		const id = validateIcon(category);
		const requestURL = `https://api.giphy.com/v1/gifs/${id}?api_key=${process.env.API_KEY}`;

		const img = document.createElement("img");
		// Pause until url is retrieved
		const response = await fetch(requestURL, { mode: "cors" });
		// Get json object
		const giphData = await response.json();

		// Find and set image
		img.src = giphData.data.images.original.url;

		return img;
	} catch (error) {
		console.error("Whoops -- something went wrong", error);
	}
}

// Check the category of the weather property and return proper icon id
function validateIcon(category) {
	category = category.toLowerCase();
	let code = null;

	switch (category) {
		case "thunder":
			code = thunderStorm;
			break;
		case "drizzle":
			code = rain;
			break;
		case "rain":
			code = rain;
			break;
		case "snow":
			code = snow;
			break;
		case "clear":
			code = clear;
			break;
		case "clouds":
			code = cloudy;
			break;
		default:
			code = misc;
	}

	return code;
}
