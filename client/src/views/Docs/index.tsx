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
} from './Docs.styles';
import Markdown from 'markdown-to-jsx';
import { ReactNode, useEffect, useState } from 'react';
import Code from '../../components/Code';
import { Menu } from '../../components/Menu';
import { FloatButton } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

export const Docs = () => {
	const [postContent, setPostContent] = useState('');
	const [article, setArticle] = useState(null);
	const [user, setUser] = useState(null);
	const [formattedDate, setFormattedDate] = useState('');

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				console.log('ID:', id);
				if (!id) {
					navigate('/article');
				}
				const response = await fetch(`http://localhost:8080/article/${id}`);
				const data = await response.json();

				setArticle(data.article);

				const date = new Date(data.article.updatedAt);
				const formatted = new Intl.DateTimeFormat('pt-BR', {
					day: '2-digit',
					month: 'short',
					year: 'numeric',
				}).format(date);
				setFormattedDate(formatted);

				const userResponse = await fetch(
					`http://localhost:8080/user/${data.article.userId}`
				);
				const userData = await userResponse.json();
				setUser(userData.user);

				if (data.article) {
					const fileResponse = await fetch(
						`http://localhost:8080/files/${data.article.file}`
					);
					const content = await fileResponse.text();
					setPostContent(content);
				}
			} catch (error) {
				console.error('Erro ao carregar o arquivo Markdown:', error);
				navigate('/article');
			}
		};

		fetchData();
	}, [id]);

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
					<HeaderTitle>{article?.title}</HeaderTitle>
					<div className="flex justify-between mt-1 mb-[20px]">
						<HeaderInfo>Enviado por: {user?.name}</HeaderInfo>
						<HeaderInfo> Última Modificação: {formattedDate}</HeaderInfo>
					</div>
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
