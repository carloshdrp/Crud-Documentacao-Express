import { Layout } from '../../components/layout';
import { Link } from 'react-router-dom';
import { Label } from './Article.styles';
import { Input } from 'antd';

export const CreateArticle = () => {
	return (
		<Layout>
			<div className="h-[92vh] overflow-hidden w-full flex flex-col justify-center">
				<h1 className="mb-2 text-5xl font-bold text-center">
					Crie um novo artigo 🗒️
				</h1>
				<p className="mb-6 text-xl text-center opacity-80">
					Veja como começar{' '}
					<Link
						to="/docs"
						className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-blue-600"
					>
						clicando aqui
					</Link>
					<form action="/" className="w-[600px] flex flex-col gap-[20px]">
						<label htmlFor="title">
							<Label>Título do artigo:</Label>
							<Input placeholder="Digite aqui..." />
						</label>
					</form>
				</p>
			</div>
		</Layout>
	);
};
