import { createContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from '../node_modules/axios';

export const myContext = createContext({});

export const Context = (props: any) => {
	const [userObjetct, setUserObjetct] = useState<any>();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			setUserObjetct(user);
		} else {
			axios
				.get('http://localhost:8080/get-user', { withCredentials: true })
				.then((res: AxiosResponse) => {
					if (res.data && res.data != 'Guest') {
						console.log(res);
						setUserObjetct(res.data);
						localStorage.setItem('user', JSON.stringify(res.data));
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);
	return (
		<myContext.Provider value={userObjetct}>
			{props.children}
		</myContext.Provider>
	);
};
