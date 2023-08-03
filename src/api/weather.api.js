export const fetchCityWeather = async (city) => {
	const data = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2d64125ab063c9fad7c95991454f7afb&units=metric`
	);
	const json = await data.json();
	const {
		main: { temp },
		coord,
	} = json;

	return {
		temperature: temp,
		coordinates: coord,
	};
};
