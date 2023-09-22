import { Input } from 'antd';
import { Category, Wrapper } from './Menu.styles';
import { Link } from 'react-router-dom';
import firstLine from '../../assets/first_line.svg';
import middleLine from '../../assets/middle_line.svg';
import lastLine from '../../assets/last_line.svg';
import { useState } from 'react';

export const Menu = () => {
	const [search, setSearch] = useState<string>('');
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const fakeData = [
		{ text: 'Express' },
		{ text: 'Nest' },
		{ text: 'Laravel' },
		{ text: 'Typescript' },
		{ text: 'React' },
	];

	const findFakeData = fakeData.filter((item) =>
		item.text.toLowerCase().includes(search.toLowerCase())
	);

	const notFound = search.length > 0 && findFakeData.length === 0;

	return (
		<div className="w-[250px]">
			<ul className="h-[calc(100vh-90px)] overflow-scroll pt-[10px] pr-[10px]">
				<Input
					placeholder="Buscar..."
					className={notFound ? 'mb-1' : 'mb-[10px]'}
					value={search}
					onChange={handleSearch}
					status={notFound ? 'error' : undefined}
				/>
				{notFound && (
					<div style={{ color: 'red' }}>Nenhum item encontrado.</div>
				)}
				<Category>Introduction</Category>
				{findFakeData.map((item, id) => (
					<Wrapper key={id}>
						<img
							className="mx-[10px]"
							src={
								id === 0
									? firstLine
									: id === fakeData.length - 1
									? lastLine
									: middleLine
							}
						/>
						<Link
							to="/"
							className="w-full"
							style={{ font: "400 20px/28px 'Mulish', sans-serif" }}
						>
							{item.text}
						</Link>
					</Wrapper>
				))}

				<Category>About</Category>
				{Array.from({ length: 5 }, (_, index) => (
					<Wrapper key={index}>
						<img
							className="mx-[10px]"
							src={
								index === 0
									? firstLine
									: index === 5 - 1
									? lastLine
									: middleLine
							}
						/>
						<Link
							to="/"
							className="w-full"
							style={{ font: "400 20px/28px 'Mulish', sans-serif" }}
						>
							Express.js
						</Link>
					</Wrapper>
				))}
			</ul>
		</div>
	);
};
