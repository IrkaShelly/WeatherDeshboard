import { styled } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useContext } from "react";
import FavoritesContext from "../context/favorites-context";

const FavoriteContainer = styled.div`
	border: 1px solid lightgrey;
	border-radius: 0.5rem;
	padding: 0.8rem;
	margin-bottom: 0.8rem;
	background-color: var(--color-dark--3);
	position: relative;
`;

const Delete = styled.button`
	position: absolute;
	top: 0;
	right: 0;
	padding: 0.3rem;
	margin: 0.2rem;
	border: none;
`;

const FavoriteItem = ({ item, index }) => {
	const { deleteFavoriteCity } = useContext(FavoritesContext);
	const handleDelete = () => {
		deleteFavoriteCity({ index });
	};

	return (
		<Draggable draggableId={item.name} index={index} key={item.name}>
			{(provided) => (
				<FavoriteContainer
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					{item.name} ({item.temperature}&deg;)
					<Delete onClick={handleDelete}>X</Delete>
				</FavoriteContainer>
			)}
		</Draggable>
	);
};

export default FavoriteItem;
