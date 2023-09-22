import axios, { AxiosResponse } from 'axios';
import { DropDown, NavWrapper, UserWrapper } from './NavBar.styles';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { myContext } from '../../../Context';

export const NavBar = () => {
	const logout = async () => {
		await axios
			.get('http://localhost:8080/auth/logout', { withCredentials: true })
			.then((res: AxiosResponse) => {
				if (res.data === 'sucess') {
					window.location.href = '/';
				}
			});
	};

	const context = useContext(myContext);

	const [isDropdownVisible, setDropdownVisible] = useState(false);

	const handleMouseEnter = () => {
		setDropdownVisible(true);
	};

	const handleMouseLeave = () => {
		setDropdownVisible(false);
	};

	return (
		<NavWrapper>
			<ul className="custom-container">
				<li>
					<Link to="/" style={{ font: "400 36px 'Oxygen', sans-serif" }}>
						Express{' '}
					</Link>
				</li>
				<div className="flex gap-[80px]">
					<li>
						<Link
							to="/docs"
							className="text-[#000000] text-right relative"
							style={{ font: "600 20px/28px 'Mulish', sans-serif" }}
						>
							Documentação
						</Link>
					</li>
					{context ? (
						<li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
							<div className="flex items-end">
								<UserWrapper
									style={{ font: "600 20px/28px 'Mulish', sans-serif" }}
								>
									{context.name}
								</UserWrapper>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
								>
									<path
										d="M16.5999 7.45831L11.1666 12.8916C10.5249 13.5333 9.4749 13.5333 8.83324 12.8916L3.3999 7.45831"
										stroke="black"
										strokeWidth="1.5"
										strokeMiterlimit="10"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>

							{isDropdownVisible && (
								<DropDown className="divide-y-2">
									<Link
										to="/new-article"
										className="text-left cursor-pointer"
										style={{ font: "600 20px/28px 'Mulish', sans-serif" }}
									>
										Novo Artigo
									</Link>
									<p
										onClick={logout}
										className="text-left cursor-pointer"
										style={{ font: "600 20px/28px 'Mulish', sans-serif" }}
									>
										Sair
									</p>
								</DropDown>
							)}
						</li>
					) : (
						<li>
							<Link
								to="/login"
								className="text-[#000000] text-right relative"
								style={{ font: "600 20px/28px 'Mulish', sans-serif" }}
							>
								Entrar
							</Link>
						</li>
					)}
				</div>
			</ul>
		</NavWrapper>
	);
};
