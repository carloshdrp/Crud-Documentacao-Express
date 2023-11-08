import { styled } from 'styled-components';

export const NavWrapper = styled.nav`
	width: 100%;
	background: linear-gradient(
		90deg,
		rgba(0, 0, 0, 0.05) 0%,
		rgba(0, 0, 0, 0.05) 0%,
		rgba(0, 0, 0, 0.15) 0.009999999747378752%,
		rgba(0, 0, 0, 0.05) 100%
	);

	ul {
		display: flex;
		align-items: center;
		justify-content: space-between;
		list-style: none;
		height: 90px;

		gap: 30px;
	}

	ul > li > * {
		&:hover {
			text-decoration: none;
		}
	}

	a {
		color: black;
		font-size: 18px;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
`;

export const DropDown = styled.div`
	border-radius: 5px;
	background: #fff;
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	position: absolute;
	padding: 4px 8px;
	display: flex;
	flex-direction: column;

	a:hover {
		text-decoration: none;
	}
`;

export const UserWrapper = styled.a`
	position: relative;
	cursor: pointer;

	&:hover {
		${DropDown} {
			display: block;
			opacity: 100%;
		}
	}
`;
