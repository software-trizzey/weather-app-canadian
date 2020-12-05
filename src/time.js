// Determine current date
const time = (() => {
	const newDay = new Date();
	const dd = String(newDay.getDate()).padStart(2, "0");
	const mm = String(newDay.getMonth()).padStart(2, "0"); //January is 0!
	const yyyy = newDay.getFullYear();

	const months = [
		"Janurary",
		"Feburary",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const weekdays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	// Find current month as String
	const _getCurrentMonth = function (day = newDay) {
		const index = day.getMonth();

		return months[index];
	};

	// Find current weekday as String
	const _getCurrentWeekday = function (day = newDay) {
		const index = day.getDay();

		return weekdays[index];
	};

	// Update the display every minute
	function currentTime(container) {
		const time = new Date();
		let hours = time.getHours();
		const minutes = String(time.getMinutes()).padStart(2, "0");
		const seconds = String(time.getSeconds()).padStart(2, "0");

		// Format into 12hour time
		// Choose either "AM" or "PM" as appropriate
		const timeOfDay = hours < 12 ? "AM" : "PM";

		// Convert the hours component to 12-hour format if needed
		hours = hours > 12 ? hours - 12 : hours;

		// Convert an hours component of "0" to "12"
		hours = hours == 0 ? 12 : hours;

		// Format and display time
		container.textContent = `${hours}:${minutes}:${seconds} ${timeOfDay}`;
	}

	// Format example: "Saturday, November 07"
	const dateWithWeekday = function (date = newDay, dd = newDay.getDate()) {
		return _getCurrentWeekday(date) + ", " + _getCurrentMonth(date) + " " + dd;
	};

	// Format date: 2020/11/03
	const defaultDate = () => yyyy + "/" + mm + "/" + dd;

	// Create new date object based off of input parameter
	const createNewDate = function (date) {
		// Create new date object
		const newDate = new Date();
		let newDateArr = null;

		// Create date array based on separators in parameter
		if (date.includes("-")) {
			newDateArr = date.split("-");
		} else {
			newDateArr = date.split("/");
		}
		// Year
		const newYear = newDateArr[0];
		newDate.setFullYear(Number(newYear));
		// Month
		const newMonth = newDateArr[1];
		newDate.setMonth(Number(newMonth));
		// Day
		const newDay = newDateArr[2];
		newDate.setDate(Number(newDay));

		// Return newly created date object
		return newDate;
	};

	return { createNewDate, defaultDate, dateWithWeekday, currentTime };
})();

export default time;
