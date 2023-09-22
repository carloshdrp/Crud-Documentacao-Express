import { styled } from 'styled-components';

export const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	a {
		padding: 5px 100px;
		background: darkred;
		color: white;
		border-radius: 5px;
		text-decoration: none;

		&:hover {
			background: #fd3434;
		}
	}
`;
