import { Layout } from '../../components/layout';
import { Link } from 'react-router-dom';
import { LoginWrapper } from './Login.styles';
import googleImage from '../../assets/google.png';

export const Login = () => {
	const googleLogin = () => {
		window.open('http://localhost:8080/auth/google/callback', '_self');
	};

	return (
		<Layout>
			<div className="h-[92vh] overflow-hidden w-full flex flex-col justify-center items-center">
				<h2 className="mb-2 text-3xl font-bold">
					Faça login com sua conta google
				</h2>
				<LoginWrapper onClick={googleLogin}>
					<img src={googleImage} alt="google" />
					<p>Entrar</p>
				</LoginWrapper>
			</div>
		</Layout>
	);
};
