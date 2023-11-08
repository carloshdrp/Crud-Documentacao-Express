import { Input, Button, Form, message } from 'antd';
import { Layout } from 'components/layout';
import { Label } from './NewCategory.styles';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const NewCategory = () => {
	const navigate = useNavigate();
	const { update } = useParams();
	const [categoryName, setCategoryName] = useState('');

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:8080/category')
			.then((response) => {
				setCategories(response.data.categories);
			})
			.catch((error) => {
				console.error(error);
				message.error('Erro ao buscar as categorias!');
			});
	}, []);

	console.log(categories);

	const [form] = Form.useForm();
	useEffect(() => {
		form.setFieldsValue({ name: categoryName });
	}, [categoryName, form]);

	useEffect(() => {
		if (update) {
			axios
				.get(`http://localhost:8080/category/${update}`)
				.then((response) => {
					setCategoryName(response.data.category.name);
				})
				.catch((error) => {
					console.error(error);
					message.error('Erro ao buscar a categoria!');
				});
		}
	}, [update]);

	const handleCategory = async (values: any) => {
		try {
			let response;
			if (update) {
				response = await axios.put(
					`http://localhost:8080/category/update?id=${update}`,
					{
						name: values.name,
					}
				);
			} else {
				response = await axios.post('http://localhost:8080/category/new', {
					name: values.name,
				});
			}

			if (!response.data.error) {
				message.success(
					update
						? 'Categoria atualizada com sucesso!'
						: 'Categoria criada com sucesso!'
				);
				navigate('/categories');
			} else {
				return await message.error(response.data.message);
			}
		} catch (error) {
			console.error(error);
			message.error(
				update ? 'Erro ao atualizar a categoria!' : 'Erro ao criar a categoria!'
			);
		}
	};

	return (
		<Layout>
			<div className="h-[92vh] overflow-hidden w-full flex flex-col justify-center items-center">
				<Form
					form={form}
					layout="vertical"
					name="create-article"
					scrollToFirstError
					style={{ width: 600 }}
					onFinish={handleCategory}
				>
					<Form.Item
						className="mb-[20px]"
						name="name"
						label={<Label>Nome da categoria</Label>}
						hasFeedback
						rules={[
							{
								type: 'string',
								message: 'A categoria precisa ser uma string!',
							},
							{
								required: true,
								message: 'O nome da categoria é obrigatório!',
							},
							{
								validator: (_, value) =>
									categories.some(
										(category) =>
											category.name.toLowerCase() === value.toLowerCase()
									)
										? Promise.reject(new Error('Nome da categoria já existe!'))
										: Promise.resolve(),
							},
						]}
					>
						<Input placeholder="Digite aqui..." />
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
