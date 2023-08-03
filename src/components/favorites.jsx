import { styled } from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import FavoriteItem from "./favorite-item";
import { useContext } from "react";
import FavoritesContext from "../context/favorites-context";

const FavoritesContainer = styled.div`
	background-color: var(--color-light--1);
	width: 50rem;
	padding: 2rem;
	color: #000;
	margin: 0.8rem;
	border: 1px solid lightgray;
	border-radius: 2px;
	color: var(--color-dark--2);
`;

const Title = styled.h2`
	font-size: 20px;
	font-weight: 600;
	padding: 0.8rem;
`;

const TaskList = styled.div`
	padding: 0.8rem;
`;

const Favorites = () => {
	const { favorites, reorderFavorites } = useContext(FavoritesContext);

	const handleDragEnd = (result) => {
		console.log(favorites);
		const { destination, source } = result;
		if (!destination) return;
		if (destination.index === source.index) return;

		reorderFavorites({ origIndex: source.index, newIndex: destination.index });
	};
	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<FavoritesContainer>
				<Title>My favorite cities:</Title>
				<Droppable droppableId="favorites">
					{(provided) => (
						<TaskList ref={provided.innerRef} {...provided.droppableProps}>
							{favorites.map((item, index) => (
								<FavoriteItem key={item.name} item={item} index={index} />
							))}
							{provided.placeholder}
						</TaskList>
					)}
				</Droppable>
			</FavoritesContainer>
		</DragDropContext>
	);
};

export default Favorites;
