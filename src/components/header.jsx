import { styled } from "styled-components";
import img from "../assets/img/nature.jpg";

const HeaderSection = styled.div`
	background-image: url(${img});
	background-size: cover;
	background-position: center;
	width: 100%;
	height: 15rem;
	padding-left: 10rem;
	display: flex;
	align-items: center;
	font-size: 4rem;
	font-weight: 700;
	letter-spacing: 2px;
`;

const Header = () => {
	return <HeaderSection>World Weather Dashboard</HeaderSection>;
};

export default Header;
