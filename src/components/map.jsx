import { styled } from "styled-components";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import L from "leaflet";
import { useContext } from "react";
import FavoritesContext from "../context/favorites-context";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
	iconUrl: require("leaflet/dist/images/marker-icon.png"),
	shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Container = styled.div`
	flex: 1;
`;

const LONDON_COORDS = [51.505, -0.09];

const Map = () => {
	const { favorites: items } = useContext(FavoritesContext);
	const position =
		items && items.length > 0
			? [items[0].coordinates.lat, items[0].coordinates.lon]
			: LONDON_COORDS;
	return (
		<Container>
			<MapContainer center={position} zoom={10} maxZoom={13}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				{items.map((item, index) => (
					<Marker
						key={`marker-${index}`}
						position={[item.coordinates.lat, item.coordinates.lon]}
					>
						<Popup>
							<span>{item.name}</span>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</Container>
	);
};

export default Map;
