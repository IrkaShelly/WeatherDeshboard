import { useReducer } from "react";
import FavoritesContext from "./favorites-context";

const initialFavoritesState = {
	favorites: [],
	shouldBeSorted: true,
};

const favoritesReducer = (state, action) => {
	let newFavorites = [];
	switch (action.type) {
		case "DELETE":
			const { index } = action.payload;
			return {
				...state,
				favorites: [
					...state.favorites.slice(0, index),
					...state.favorites.slice(index + 1),
				],
			};

		case "REORDER":
			const { origIndex, newIndex } = action.payload;

			newFavorites = [...state.favorites];
			console.log(newFavorites);
			newFavorites.splice(origIndex, 1);
			newFavorites.splice(newIndex, 0, state.favorites[origIndex]);
			return {
				shouldBeSorted: false,
				favorites: newFavorites,
			};

		case "ADD":
			const { name, temperature, coordinates } = action.payload;
			const existsInFavorits = state.favorites.find(
				(favorite) => favorite.name === name
			);
			if (existsInFavorits) return state;

			newFavorites = [...state.favorites, { name, temperature, coordinates }];

			if (state.shouldBeSorted) {
				newFavorites = newFavorites.sort(
					(a, b) => a.temperature - b.temperature
				);
			}

			return {
				...state,
				favorites: newFavorites,
			};

		default:
			return state;
	}
};

const FavoritesProvider = (props) => {
	const [state, dispatch] = useReducer(favoritesReducer, initialFavoritesState);

	const deleteFavorite = ({ index }) => {
		dispatch({
			type: "DELETE",
			payload: {
				index,
			},
		});
	};

	const addFavorite = ({ name, temperature, coordinates }) => {
		dispatch({
			type: "ADD",
			payload: {
				name,
				temperature,
				coordinates,
			},
		});
	};

	const reorderFavorites = ({ origIndex, newIndex }) => {
		dispatch({
			type: "REORDER",
			payload: {
				origIndex,
				newIndex,
			},
		});
	};

	const favoritesContext = {
		favorites: state.favorites,
		deleteFavoriteCity: deleteFavorite,
		addNewCityToFavorites: addFavorite,
		reorderFavorites,
	};
	return (
		<FavoritesContext.Provider value={favoritesContext}>
			{props.children}
		</FavoritesContext.Provider>
	);
};

export default FavoritesProvider;
