import { styled } from "styled-components";
import { Draggable } from "react-beautiful-dnd";

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

const FavoriteItem = ({ item, index, updateFavorites }) => {
	const handleDelete = () => {
		updateFavorites((prevFavorites) => {
			const newFavorites = [...prevFavorites];
			newFavorites.splice(index, 1);
			return newFavorites;
		});
	};
	return (
		<Draggable draggableId={item.id} index={index} key={item.id}>
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
