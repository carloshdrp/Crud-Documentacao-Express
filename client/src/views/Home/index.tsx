import { Layout } from '../../components/layout';
import { Link } from 'react-router-dom';
import { Paragraph } from '../../global.styles';
import { Title } from './Home.styles';
import brandsImage from '../../assets/brands.png';

export const Home = () => {
	return (
		<Layout>
			<div className="flex flex-col items-center justify-center h-full gap-10 2xl:gap-20">
				<header className="flex flex-col items-center">
					<Title>Fast. Unopinionated. Minimalist.</Title>
					<Paragraph>Um framework web minimalista para Node.js</Paragraph>
				</header>

				<div className="flex flex-row gap-[100px] items-center justify-center shrink-0 relative">
					<div className="bg-[rgba(0,0,0,0.10)] rounded-[10px] border-solid border-[rgba(0,0,0,0.20)] border pt-[15px] pr-2.5 pb-[15px] pl-2.5 flex flex-row gap-[50px] items-center justify-center shrink-0 relative">
						<div
							className="text-[#000000] text-left relative"
							style={{ font: "400 24px/28px 'Roboto Mono', monospace" }}
						>
							$ npm install express --save{' '}
						</div>
						<div className="relative w-6 h-6 shrink-0">
							<svg
								className="absolute top-0 left-0 overflow-visible"
								style={{}}
								width="24"
								height="25"
								viewBox="0 0 24 25"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M17 13.9V16.9C17 20.9 15.4 22.5 11.4 22.5H7.6C3.6 22.5 2 20.9 2 16.9V13.1C2 9.1 3.6 7.5 7.6 7.5H10.6"
									stroke="black"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M17 13.9H13.8C11.4 13.9 10.6 13.1 10.6 10.7V7.5L17 13.9Z"
									stroke="black"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M11.6 2.5H15.6"
									stroke="black"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M7 5.5C7 3.84 8.34 2.5 10 2.5H12.62"
									stroke="black"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M22 8.5V14.69C22 16.24 20.74 17.5 19.19 17.5"
									stroke="black"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M22 8.5H19C16.75 8.5 16 7.75 16 5.5V2.5L22 8.5Z"
									stroke="black"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>
					<Link
						to="/docs"
						className="rounded-[10px] shrink-0 w-[172px] h-[58px] relative"
					>
						<div
							className="bg-[rgba(0,0,0,0.50)] rounded-[10px] border-solid border-black border w-[172px] h-[58px] absolute left-0 top-0"
							style={{ filter: 'blur(40px)' }}
						></div>
						<div className="bg-white rounded-[10px] border-solid border-black border-[0.8px] w-[172px] h-[58px] absolute left-0 top-0"></div>
						<div
							className=" absolute left-[15px] top-[15px] w-[142px] text-center"
							style={{ font: "400 24px/28px 'Pacaembu Trial', sans-serif" }}
						>
							Saiba Mais
						</div>
					</Link>
				</div>

				<div className="flex flex-col gap-2.5 items-center justify-center shrink-0 relative">
					<div
						className="text-[rgba(0,0,0,0.60)] text-left uppercase relative"
						style={{ font: "400 20px/28px 'Pacaembu Trial', sans-serif" }}
					>
						usado por{' '}
					</div>
					<img
						className="shrink-0 max-w-[1200px] max-h-[139px] relative"
						src={brandsImage}
					/>
				</div>
			</div>
		</Layout>
	);
};
