import { styled } from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import FavoriteItem from "./favorite-item";
import { useEffect, useState } from "react";

const FavoritesContainer = styled.div`
	background-color: var(--color-light--1);
	width: 50rem;
	padding: 2rem;
	color: #000;
	margin: 0.8rem;
	border: 1px solid lightgray;
	border-radius: 2px;
	color: var(--color-dark--2);
	overflow-y: scroll;
`;

const Title = styled.h2`
	font-size: 20px;
	font-weight: 600;
	padding: 0.8rem;
`;

const TaskList = styled.div`
	padding: 0.8rem;
`;

const Favorites = ({ favorites, updateFavorites }) => {
	const [reordered, setReordered] = useState(false);

	useEffect(() => {
		if (reordered) return;
		updateFavorites((prevFavorites) => {
			const sortedFavorites = [...prevFavorites];
			return sortedFavorites.sort((a, b) => a.temperature - b.temperature);
		});
	}, [favorites, reordered]);

	const handleDragEnd = (result) => {
		console.log(favorites);
		const { destination, source } = result;
		if (!destination) return;
		if (destination.index === source.index) return;

		setReordered(true);

		updateFavorites((prevFavorites) => {
			let newFavorites = [...prevFavorites];
			console.log(newFavorites);
			newFavorites.splice(source.index, 1);
			newFavorites.splice(destination.index, 0, prevFavorites[source.index]);
			console.log(newFavorites);
			return newFavorites;
		});
	};
	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<FavoritesContainer>
				<Title>My favorite cities:</Title>
				<Droppable droppableId="favorites">
					{(provided) => (
						<TaskList ref={provided.innerRef} {...provided.droppableProps}>
							{favorites.map((item, index) => (
								<FavoriteItem
									key={item.id}
									item={item}
									index={index}
									updateFavorites={updateFavorites}
								/>
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
