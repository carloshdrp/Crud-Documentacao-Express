import {
	DeleteOutlined,
	EditOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import { InputRef, Input, Space, Button, Table } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { Layout } from 'components/layout';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface DataType {
	key: React.Key;
	id: number;
	name: string;
}

type DataIndex = keyof DataType;

export const Articles = () => {
	const navigate = useNavigate();
	const [data, setData] = useState<DataType[]>([]);
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const [update, setUpdate] = useState(0);
	const searchInput = useRef<InputRef>(null);

	useEffect(() => {
		axios
			.get('http://localhost:8080/article')
			.then((response) => {
				setData(response.data.articles);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}, [update]);

	const handleSearch = (
		selectedKeys: string[],
		confirm: (param?: FilterConfirmProps) => void,
		dataIndex: DataIndex
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText('');
	};

	const getColumnSearchProps = (
		dataIndex: DataIndex
	): ColumnType<DataType> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Buscar por ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(selectedKeys as string[], confirm, dataIndex)
					}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="default"
						onClick={() =>
							handleSearch(selectedKeys as string[], confirm, dataIndex)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Buscar
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Limpar
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						fechar
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});

	const columns: ColumnsType<DataType> = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: '50px',
			sorter: (a: DataType, b: DataType) => b.id - a.id,
		},
		{
			title: 'Título',
			dataIndex: 'title',
			key: 'title',
			width: '500px',
			...getColumnSearchProps('title'),
		},
		{
			title: 'Ações',
			dataIndex: 'actions',
			key: 'actions',
			render: (_, record) => (
				<>
					<Button type="link" disabled>
						<EditOutlined
							style={{ fontSize: '18px', color: '#535353030', marginRight: 4 }}
							className="p-2 rounded-md hover:bg-gray-200"
						/>
					</Button>
					<Button
						type="link"
						danger
						onClick={() => {
							axios
								.delete(`http://localhost:8080/article/delete/${record.id}`)
								.then(() => {
									setUpdate(update + 1);
								})
								.catch((error) => {
									console.error('Error:', error);
								});
						}}
					>
						<DeleteOutlined
							style={{ fontSize: '18px', color: '#cc0000' }}
							className="p-2 rounded-md hover:bg-gray-200"
						/>
					</Button>
				</>
			),
		},
	];

	return (
		<Layout>
			<div className="mt-[10px] flex flex-col items-center justify-center w-full">
				<h1 className="mb-2 text-5xl font-bold text-center">
					Artigos Cadastrados
				</h1>
				<Table
					columns={columns}
					pagination={{ pageSize: 5 }}
					dataSource={data}
				/>
				<Link
					to="/new-article"
					className="p-1 px-4 scale-110 bg-gray-100 rounded-md"
				>
					Criar novo artigo
				</Link>
			</div>
		</Layout>
	);
};
