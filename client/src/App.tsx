import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from './utils/PrivateRoute';
import { CreateArticle } from './views/Article';
import { Docs } from './views/Docs';
import { Home } from './views/Home';
import { Login } from './views/Login';
import { NotFound } from './views/NotFound';
import { useContext } from 'react';
import { myContext } from './Context';
import { ConfigProvider } from 'antd';

export const App = () => {
	const userObject = useContext(myContext);
	console.log(userObject);

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#1d1d1d',
					colorInfo: '#1d1d1d',
					colorBgBase: '#f5f5f5',
					fontSize: 16,
					borderRadius: 10,
					wireframe: false,
				},
			}}
		>
			<BrowserRouter>
				<Routes>
					{/*Rota Normal:*/}
					<Route path="/" element={<Home />} />
					<Route path="/docs" element={<Docs />} />
					<Route path="/login" element={<Login />} />

					{/*Rotas Aninhadas:*/}
					{/* <Route path="/posts" element={<Posts />}>
      <Route path=":id" element={<Post />} />
    </Route> */}

					{/*Rotas Privadas:*/}
					<Route element={<PrivateRoutes />}>
						<Route path="/new-article" element={<CreateArticle />} />
					</Route>

					{/*Not Found:*/}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</ConfigProvider>
	);
};
