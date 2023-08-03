import "./App.css";
import Header from "./components/header";
import CitySelection from "./components/city-selection";
import { styled } from "styled-components";
import Map from "./components/map";
import Favorites from "./components/favorites";
import "leaflet/dist/leaflet.css";
import FavoritesProvider from "./context/favorites-provider";

const MapAndFavoritesContainer = styled.div`
	display: flex;
	gap: 2rem;
`;

function App() {
	return (
		<div className="App">
			<FavoritesProvider>
				<Header className="App-header">World weather dashboard</Header>
				<CitySelection />
				<MapAndFavoritesContainer>
					<Map />
					<Favorites />
				</MapAndFavoritesContainer>
			</FavoritesProvider>
		</div>
	);
}

export default App;
