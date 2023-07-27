import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StarSVG from "../assets/icons/star.svg";

const CitySelectionSection = styled.section`
	background-color: var(--color-light--1);
	width: 100%;
	height: 50px;
`;

const CitySelectionForm = styled.form`
	margin: auto;
	max-width: 100rem;
	background-color: var(--color-light--1);
	display: flex;
	align-items: center;
	height: 100%;
	color: var(--color-dark--2);
`;

const Label = styled.label`
	margin-right: 1.3rem;
`;

const cities = [
	"London",
	"Paris",
	"Boston",
	"New York",
	"Tel Aviv",
	"Eilat",
	"Bangkok",
	"Viena",
	"Manila",
	"Helsinki",
];

const SelectedCity = styled.div`
	color: var(--color-dark--1);
	margin-left: 4rem;
	font-size: 1.8rem;
	font-weight: 500;
	border: 1px dotted;
	padding: 0.2rem 1.2rem;
	margin-right: 1rem;
`;

const AddToFavorites = styled.button`
	cursor: pointer;
	border: none;
	display: flex;
	gap: 0.4rem;
	align-items: center;
	margin-left: 0.3rem;
	padding: 0.4rem;
	border-radius: 0.5rem;

	&:hover {
		background-color: var(--color-light--3);
	}
`;

const Temperature = styled.div`
	font-size: 2rem;
	padding: 0.4rem;
	border-radius: 0.3rem;
	background-color: ${({ temp }) =>
		`hsl(${30 + (140 * (30 - temp)) / 60} , 70%, 50%)`};
`;

const CitySelection = ({ favorites, updateFavorites }) => {
	const [city, setCity] = useState(null);
	const [temp, setTemp] = useState(null);
	const [coord, setCoord] = useState(null);
	const [selectedIsFavorite, setSelectedIsFavorite] = useState(false);

	const handleCitySelection = (e) => {
		setCity(e.target.value);
	};

	useEffect(() => {
		// declare the data fetching function
		const fetchData = async (city) => {
			const data = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2d64125ab063c9fad7c95991454f7afb&units=metric`
			);
			const json = await data.json();
			const {
				main: { temp },
				coord,
			} = json;

			if (temp) setTemp(Math.round(temp));
			if (coord) setCoord(coord);
			return json;
		};

		if (city) fetchData(city).catch(console.error);
		else setTemp(null);
	}, [city]);

	useEffect(() => {
		if (favorites.find((item) => item.name === city))
			setSelectedIsFavorite(true);
		else setSelectedIsFavorite(false);
	}, [favorites, city]);

	const handleSubmit = (e) => {
		e.preventDefault();

		updateFavorites((prevFavorites) => {
			if (prevFavorites.find((item) => item.name === city))
				return prevFavorites;
			return [
				...prevFavorites,
				{ name: city, temperature: temp, coordinates: coord, id: uuidv4() },
			];
		});
	};

	return (
		<CitySelectionSection>
			<CitySelectionForm onSubmit={handleSubmit}>
				<Label htmlFor="select-city">Select your city:</Label>
				<select
					id="select-city"
					required
					name="select-city"
					onChange={handleCitySelection}
				>
					<option value="" key="none">
						Please choose one option
					</option>
					{cities.map((city) => (
						<option value={city} key={city}>
							{city}
						</option>
					))}
				</select>
				{city && <SelectedCity>{city}</SelectedCity>}
				{temp && <Temperature temp={temp}>{temp}&deg;</Temperature>}
				{city && (
					<AddToFavorites title="Add to favorites">
						<StarSVG shouldFill={selectedIsFavorite} />
						Add to favorites
					</AddToFavorites>
				)}
			</CitySelectionForm>
		</CitySelectionSection>
	);
};

export default CitySelection;
