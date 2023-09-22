import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import { Context } from './Context';
import { App } from './App';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
	<React.StrictMode>
		<Context>
			<App />
		</Context>
	</React.StrictMode>
);
