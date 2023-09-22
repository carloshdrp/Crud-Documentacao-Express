import { styled } from 'styled-components';

export const LoginWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	background-color: #006eff;
	padding: 5px 20px;
	color: white;
	border-radius: 5px;
	cursor: pointer;
	transition: all 0.2s linear;

	&:hover {
		background-color: #0259ca;
	}

	img {
		max-width: 2rem;
		max-height: 2rem;
		margin-right: 15px;
	}
`;
