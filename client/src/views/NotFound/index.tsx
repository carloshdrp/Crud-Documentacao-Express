import { Link } from 'react-router-dom';
import { Container } from './NotFound.styles';

export const NotFound = () => {
	return (
		<Container>
			<h1>Página não encontrada</h1>
			<Link to="/">Inicio</Link>
		</Container>
	);
};
