import { Layout } from '../../components/layout';
import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

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
				<Button
					onClick={googleLogin}
					size="large"
					icon={<GoogleOutlined />}
					className="w-64"
				>
					Entrar
				</Button>
			</div>
		</Layout>
	);
};
