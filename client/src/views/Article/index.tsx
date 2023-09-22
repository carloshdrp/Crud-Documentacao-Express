import { Layout } from '../../components/layout';
import { Link } from 'react-router-dom';
import { Label } from './Article.styles';
import { Input, Select, UploadFile, UploadProps, message } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';

export const CreateArticle = () => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const props: UploadProps = {
		name: 'file',
		fileList,
		maxCount: 1,
		accept: '.md',
		action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
		beforeUpload(file: UploadFile) {
			const isMD = file.type === 'text/markdown';
			if (!isMD) {
				setFileList((state) => [...state]);
				message.error('O arquivo deve ser Markdown (.md)');
				return false;
			}
			setFileList((state) => [...state, file]);
		},
		onRemove: (file: UploadFile) => {
			if (fileList.some((item) => item.uid === file.uid)) {
				setFileList((fileList) =>
					fileList.filter((item) => item.uid !== file.uid)
				);
				return true;
			}
			return false;
		},
		async onChange(info) {
			try {
				const { status } = info.file;
				if (status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				if (status === 'done') {
					await message.success(`${info.file.name} foi enviado com sucesso.`);
				} else if (status === 'error') {
					await message.error(
						`Não foi possível enviar o arquivo ${info.file.name}.`
					);
				}
			} catch (error) {
				console.error(error);
			}
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};

	const onChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	const onSearch = (value: string) => {
		console.log('search:', value);
	};

	// Filter `option.label` match the user type `input`
	const filterOption = (
		input: string,
		option: { label: string; value: string }
	) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

	return (
		<Layout>
			<div className="h-[92vh] overflow-hidden w-full flex flex-col justify-center items-center">
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
				<form action="/" className="w-[600px] flex flex-col gap-[20px]">
					<label htmlFor="title" className="mb-[20px]">
						<Label>Título do artigo:</Label>
						<Input placeholder="Digite aqui..." />
					</label>
					<label htmlFor="class" className="mb-[20px]">
						<Label>Categoria do Artigo:</Label>
						<Select
							showSearch
							placeholder="Selecione a categoria"
							optionFilterProp="children"
							onChange={onChange}
							onSearch={onSearch}
							className="w-full"
							filterOption={filterOption}
							options={[
								{
									value: 'jack',
									label: 'Jack',
								},
								{
									value: 'lucy',
									label: 'Lucy',
								},
								{
									value: 'tom',
									label: 'Tom',
								},
							]}
						/>
					</label>
					<label htmlFor="file" className="mb-[20px]">
						<Label>Arquivo Markdown:</Label>
						<Dragger {...props}>
							<p className="ant-upload-drag-icon">
								<InboxOutlined />
							</p>
							<p className="ant-upload-text">
								Aperte ou solte um arquivo para enviar
							</p>
							<p className="ant-upload-hint">
								Siga as normas de conduta para cadastrar um novo artigo.
							</p>
						</Dragger>{' '}
					</label>
				</form>
			</div>
		</Layout>
	);
};
