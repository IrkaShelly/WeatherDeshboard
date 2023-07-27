const StarSVG = ({ shouldFill }) => {
	const fillColor = shouldFill ? "yellow" : "none";
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="ionicon"
			viewBox="0 0 512 512"
			width="24px"
		>
			<path
				d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
				fill={fillColor}
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="32"
			/>
		</svg>
	);
};

export default StarSVG;
