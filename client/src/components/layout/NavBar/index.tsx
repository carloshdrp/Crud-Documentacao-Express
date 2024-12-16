import axios from 'axios';
import { DropDown, NavWrapper, UserWrapper } from './NavBar.styles';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { myContext } from '../../../Context';

export const NavBar = () => {
	const navigate = useNavigate();

	const logout = async () => {
		try {
			await axios.get('http://localhost:8080/auth/logout', {
				withCredentials: true,
			});
			localStorage.removeItem('user');
			return navigate(0);
		} catch (error: any) {
			console.error('Error logging out:', error.message);
		}
	};

	const context = useContext(myContext);
	console.log(context);

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
						Express
					</Link>
				</li>
				<div className="flex gap-[80px]">
					<li>
						<Link
							to="/article"
							className="text-[#000000] text-right relative"
							style={{ font: "600 20px/28px 'Mulish', sans-serif" }}
						>
							Documentação
						</Link>
					</li>
					{context ? (
						<li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
							<div className="flex items-center">
								<img
									src={context.avatar}
									alt="avatar"
									className="object-fill w-10 h-10 mr-2 rounded-full"
								/>
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
								<DropDown className="ml-10 divide-y-2">
									<Link
										to="/articles"
										className="text-left cursor-pointer"
										style={{ font: "600 20px/28px 'Mulish', sans-serif" }}
									>
										Artigos
									</Link>
									<Link
										to="/categories"
										className="text-left cursor-pointer"
										style={{ font: "600 20px/28px 'Mulish', sans-serif" }}
									>
										Categorias
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
