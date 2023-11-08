import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from './utils/PrivateRoute';
import { CreateArticle } from './views/Article';
import { Docs } from './views/Docs';
import { Home } from './views/Home';
import { Login } from './views/Login';
import { NewCategory } from './views/NewCategory';
import { NotFound } from './views/NotFound';
import { Articles } from './views/Articles';
import { useContext } from 'react';
import { myContext } from './Context';
import { ConfigProvider } from 'antd';
import { Category } from './views/Category';
import { Welcome } from './views/Welcome';

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
					<Route path="/article" element={<Welcome />} />
					<Route path="/article/:id" element={<Docs />} />
					<Route path="/login" element={<Login />} />

					{/*Rotas Aninhadas:*/}
					{/* <Route path="/posts" element={<Posts />}>
      <Route path=":id" element={<Post />} />
    </Route> */}

					{/*Rotas Privadas:*/}
					<Route element={<PrivateRoutes />}>
						<Route path="/new-article" element={<CreateArticle />} />
						<Route path="/articles" element={<Articles />} />
						<Route path="/categories" element={<Category />} />
						<Route path="/category/new" element={<NewCategory />} />
						<Route path="/category/new/:update" element={<NewCategory />} />
					</Route>

					{/*Not Found:*/}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</ConfigProvider>
	);
};
