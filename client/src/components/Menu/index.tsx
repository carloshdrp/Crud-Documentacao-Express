import { Input } from 'antd';
import { Category, Wrapper } from './Menu.styles';
import { Link } from 'react-router-dom';
import firstLine from '../../assets/first_line.svg';
import middleLine from '../../assets/middle_line.svg';
import lastLine from '../../assets/last_line.svg';
import React, { useState, useEffect } from 'react';

export const Menu = () => {
	const [search, setSearch] = useState<string>('');
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetch('http://localhost:8080/category')
			.then((response) => response.json())
			.then((data) => {
				console.log(data.categories);
				setCategories(data.categories);
			});
	}, []);

	const [articles, setArticles] = useState({});

	useEffect(() => {
		categories.forEach((category) => {
			fetch(`http://localhost:8080/article/category/${category.id}`)
				.then((response) => response.json())
				.then((data) => {
					setArticles((prevArticles) => ({
						...prevArticles,
						[category.id]: data.article,
					}));
				});
		});
	}, [categories]);

	return (
		<div className="w-[250px]">
			<ul className="h-[calc(100vh-90px)] overflow-scroll pt-[10px] pr-[10px]">
				{categories.map((category) => (
					<React.Fragment key={category.id}>
						<Category>{category.name}</Category>
						{articles[category.id]?.map((article, id) => (
							<Wrapper key={id}>
								<img
									className="mx-[10px]"
									src={
										id === 0
											? firstLine
											: id === articles[category.id].length - 1
											? lastLine
											: middleLine
									}
								/>
								<Link
									to={`/article/${article.id}`}
									className="w-full"
									style={{ font: "400 20px/28px 'Mulish', sans-serif" }}
								>
									{article.title}
								</Link>
							</Wrapper>
						))}
					</React.Fragment>
				))}
			</ul>
		</div>
	);
};
