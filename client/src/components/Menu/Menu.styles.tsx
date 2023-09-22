import { styled } from 'styled-components';

export const Wrapper = styled.li`
	display: flex;
	&:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}
`;

export const Category = styled.h2`
	color: #000;
	font-family: Mulish, sans-serif;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: 28px; /* 140% */
	text-transform: uppercase;
	&:not(:nth-child(2)) {
		margin-top: 10px;
	}
`;
