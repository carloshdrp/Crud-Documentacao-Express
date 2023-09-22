import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { myContext } from '../Context';

export const PrivateRoutes = () => {
	const userObject = useContext(myContext);
	return userObject ? <Outlet /> : <Navigate to="/" />;
};
