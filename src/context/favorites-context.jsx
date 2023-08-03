import React from "react";

const defaulFavoritesContext = {
	favorites: [],
	addFavorite: () => {},
	deleteFavorite: () => {},
	reorderFavorites: () => {},
};
const FavoritesContext = React.createContext(defaulFavoritesContext);

export default FavoritesContext;
