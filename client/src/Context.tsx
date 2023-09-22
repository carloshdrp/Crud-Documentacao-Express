import { createContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from '../node_modules/axios';

export const myContext = createContext({});

export const Context = (props: any) => {
	const [userObjetct, setUserObjetct] = useState<any>();

	useEffect(() => {
		axios
			.get('http://localhost:8080/get-user', { withCredentials: true })
			.then((res: AxiosResponse) => {
				if (res.data) {
					console.log(res);
					setUserObjetct(res.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<myContext.Provider value={userObjetct}>
			{props.children}
		</myContext.Provider>
	);
};
