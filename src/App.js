import "./App.css";
import Header from "./components/header";
import CitySelection from "./components/city-selection";
import { styled } from "styled-components";
import Map from "./components/map";
import Favorites from "./components/favorites";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

const MapAndFavoritesContainer = styled.div`
	display: flex;
	gap: 2rem;
`;

function App() {
	const [favoriteCities, updateFavoriteCities] = useState([]);
	return (
		<div className="App">
			<Header className="App-header">World weather dashboard</Header>
			<CitySelection
				favorites={favoriteCities}
				updateFavorites={updateFavoriteCities}
			/>
			<MapAndFavoritesContainer>
				<Map items={favoriteCities} />
				<Favorites
					favorites={favoriteCities}
					updateFavorites={updateFavoriteCities}
				/>
			</MapAndFavoritesContainer>
		</div>
	);
}

export default App;
