import { styled } from 'styled-components';

export const Title = styled.p`
	color: rgba(0, 0, 0, 0.9);
	font-family: Pacaembu Trial;
	font-size: 36px;
	font-style: normal;
	font-weight: 700;
	border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;

export const Subtitle = styled.p`
	color: rgba(0, 0, 0, 0.9);
	font-family: Pacaembu Trial;
	font-size: 32px;
	font-style: normal;
	font-weight: 700;
`;

export const SubSubtitle = styled.p`
	color: rgba(0, 0, 0, 0.9);
	font-family: Pacaembu Trial;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
`;

export const InlineLink = styled.a`
	color: rgba(40, 91, 220, 0.9);
	font-family: Mulish;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	text-decoration-line: underline;
	&:hover {
		text-decoration: none;
	}
`;

export const InlineCode = styled.code`
	color: rgba(0, 0, 0, 0.8);
	font-family: Roboto Mono;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 28px;
	border-radius: 5px;
	background: rgba(0, 0, 0, 0.1);
	padding: 0 5px;
`;

export const Citation = styled.blockquote`
	background: #cacaca;
	padding-left: 10px;
	border-left: 3px solid gray;
	padding-top: 5px;
	padding-bottom: 5px;
	font-style: italic;
`;

export const HeaderTitle = styled.h1`
	color: rgba(0, 0, 0, 0.9);
	font-family: Pacaembu Trial;
	font-size: 46px;
	font-style: normal;
	font-weight: 600;
	line-height: 46px; /* 60.87% */
`;

export const HeaderInfo = styled.p`
	color: rgba(0, 0, 0, 0.8);
	font-family: Mulish;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
`;

export const Paragraph = styled.p`
	color: rgba(0, 0, 0, 0.9);
	font-family: Mulish;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px; /* 175% */
`;
