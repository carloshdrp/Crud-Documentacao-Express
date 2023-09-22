import { ReactNode } from 'react';
import { NavBar } from '../../components/layout/NavBar';

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="h-[calc(100vh-90px)]">
			<NavBar />
			<main className="h-full">{children}</main>
		</div>
	);
};
