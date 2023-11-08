/* eslint-disable import/no-extraneous-dependencies */
import { Layout } from '../../components/layout';
import {
	Title,
	Subtitle,
	SubSubtitle,
	InlineLink,
	Citation,
	HeaderTitle,
	HeaderInfo,
	Paragraph,
} from '../Docs/Docs.styles';
import Markdown from 'markdown-to-jsx';
import { ReactNode, useEffect, useState } from 'react';
import Code from '../../components/Code';
import { Menu } from '../../components/Menu';

export const Welcome = () => {
	const [postContent, setPostContent] = useState('');

	useEffect(() => {
		fetch('exemple.md')
			.then((response) => response.text())
			.then((content) => {
				setPostContent(content);
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.error('Erro ao carregar o arquivo Markdown:', error);
			});
	}, []);

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetch('http://localhost:8080/category')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setCategories(data);
			});
	}, []);

	interface CodeProps {
		children?: ReactNode;
	}
	const PreBlock = ({ children, ...rest }: CodeProps) => {
		if (
			children &&
			typeof children === 'object' &&
			'type' in children &&
			children.type === 'code'
		) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			return Code(children.props);
		}
		return <pre {...rest}>{children}</pre>;
	};

	return (
		<Layout>
			<div className="flex custom-container">
				<Menu />
				<div className="w-4/5 px-10 h-[calc(100vh-128px)] overflow-scroll m-[10px]">
					<Markdown
						options={{
							wrapper: 'article',
							overrides: {
								h1: {
									component: Title,
								},
								h2: {
									component: Subtitle,
								},
								h3: {
									component: SubSubtitle,
								},
								a: {
									component: InlineLink,
								},
								p: {
									component: Paragraph,
								},
								pre: PreBlock,
								blockquote: {
									component: Citation,
								},
							},
						}}
					>
						{postContent}
					</Markdown>
				</div>
			</div>
		</Layout>
	);
};
