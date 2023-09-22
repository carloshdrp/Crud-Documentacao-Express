import { ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeProps {
	className?: string;
	children: ReactNode;
}

const Code = ({ children, className }: CodeProps) => {
	let codeContent: string;
	const language = className?.replace('lang-', ''); // Usar operador de verificação de nulidade (?.) para evitar erro

	if (typeof children === 'string') {
		codeContent = children;
	} else if (
		Array.isArray(children) &&
		children.every((child) => typeof child === 'string')
	) {
		codeContent = children.join('\n');
	} else {
		codeContent = '';
	}

	return (
		<div className="code">
			<SyntaxHighlighter style={oneLight} language={language?.toLowerCase()}>
				{codeContent}
			</SyntaxHighlighter>
		</div>
	);
};

export default Code;
