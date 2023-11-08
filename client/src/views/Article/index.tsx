import { Layout } from 'components/layout';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from './Article.styles';
import {
	Button,
	Form,
	Input,
	Select,
	Upload,
	UploadFile,
	UploadProps,
	message,
} from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { UploadChangeParam } from 'antd/es/upload';

export const CreateArticle = () => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:8080/article')
			.then((response) => {
				setArticles(response.data.articles);
			})
			.catch((error) => {
				console.error(error);
				message.error('Erro ao buscar os artigos!');
			});
	}, []);

	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get('http://localhost:8080/category')
			.then((response) => {
				setCategories(
					response.data.categories.map((category) => ({
						value: category.id,
						label: category.name,
					}))
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const [uploadedFile, setUploadedFile] = useState(null);

	const deleteFile = (filename) => {
		axios.delete(`http://localhost:8080/file/${filename}`).catch((error) => {
			console.error(error);
		});
	};

	const props: UploadProps = {
		name: 'file',
		maxCount: 1,
		accept: '.md',
		action: 'http://localhost:8080/file',

		async beforeUpload(file: UploadFile) {
			const isMD: boolean =
				file.type === 'text/markdown' ||
				file.name.endsWith('.md') ||
				file.name.endsWith('.markdown');
			if (!isMD) {
				await message.error(`${file.name} não é um arquivo Markdown.`);
			}
			return isMD || Upload.LIST_IGNORE;
		},
		onChange: (info: UploadChangeParam) => {
			const { status, response } = info.file;
			if (status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				if (uploadedFile) {
					deleteFile(uploadedFile);
				}
				setUploadedFile(response.fileName);
				message.success(`${info.file.name} foi enviado com sucesso.`);
			} else if (status === 'error') {
				message.error(`Não foi possível enviar o arquivo ${info.file.name}.`);
			}
		},
		onRemove: (file: UploadFile) => {
			if (uploadedFile) {
				deleteFile(uploadedFile);
			}
			setUploadedFile(null);
		},
	};

	const onFinish = async (values: any) => {
		const userData = JSON.parse(localStorage.getItem('user'));

		const { title, category } = values;
		const file = uploadedFile;
		const user = userData.id;

		const data = {
			title,
			category,
			file,
			user,
		};

		try {
			const response = await axios.post(
				'http://localhost:8080/article/new',
				data
			);
			if (response.data.error === false) {
				message.success('Artigo criado com sucesso!');
				navigate('/articles');
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			return message.error(error.message);
		}
	};

	const filterOption = (
		input: string,
		option?: { label: string; value: string }
	) => {
		if (option) {
			return option.label.toLowerCase().includes(input.toLowerCase());
		}
		return false;
	};

	return (
		<Layout>
			<div className="flex flex-col items-center justify-center w-full my-4 ">
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
				</p>
				<Form
					layout="vertical"
					name="create-article"
					scrollToFirstError
					style={{ width: 600 }}
					onFinish={onFinish}
				>
					<Form.Item
						className="mb-[20px]"
						name="title"
						label={<Label>Título do artigo</Label>}
						hasFeedback
						rules={[
							{
								type: 'string',
								message: 'O título precisa ser uma string!',
							},
							{
								required: true,
								message: 'O título é obrigatório!',
							},
							{
								validator: (_, value) =>
									articles.some(
										(article) =>
											article.title.toLowerCase() === value.toLowerCase()
									)
										? Promise.reject(
												new Error('Já existe um artigo com esse título!')
										  )
										: Promise.resolve(),
							},
						]}
					>
						<Input placeholder="Digite aqui..." />
					</Form.Item>
					<Form.Item
						label={<Label>Categoria do Artigo:</Label>}
						name="category"
						hasFeedback
						extra={<Link to="/categories">Gerenciar as categorias</Link>}
						rules={[
							{
								required: true,
								message: 'A categoria é obrigatória!',
							},
						]}
					>
						<Select
							showSearch
							placeholder="Selecione a categoria"
							optionFilterProp="children"
							className="w-full"
							filterOption={filterOption}
							options={categories}
						/>
					</Form.Item>
					<Form.Item
						label={<Label>Arquivo Markdown:</Label>}
						tooltip="Veja como começar na página de documentação."
						name="file"
						rules={[
							{
								required: true,
								message: 'O arquivo é obrigatório!',
							},
						]}
					>
						<Dragger {...props}>
							<p className="ant-upload-drag-icon">
								<InboxOutlined />
							</p>
							<p className="ant-upload-text">
								Aperte ou solte um arquivo para enviar
							</p>
							<p className="ant-upload-hint">
								Siga as normas de formatação para enviar um arquivo.
							</p>
						</Dragger>
					</Form.Item>
					<Form.Item>
						<Button className="w-full" htmlType="submit">
							Adicionar
						</Button>
					</Form.Item>
				</Form>
			</div>
		</Layout>
	);
};
