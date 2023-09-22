import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoutes = () => {
	const logged = false;
	return logged ? <Outlet /> : <Navigate to="/" />;
};
