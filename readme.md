Este projeto é uma aplicação web de documentação inspirada no Express.js. Ele permite aos usuários acessar artigos organizados por categorias e, após autenticação via Google, realizar operações CRUD em categorias e artigos.

## Funcionalidades Principais
- Visualização de artigos por categorias
- Autenticação de usuários via Conta Google
- CRUD de categorias e artigos (para usuários autenticados)
- Renderização de arquivos Markdown

## Stack
- Linters para organização do código
- TypeScript

### Back-end
- Express.js
- PostgreSQL
- Prisma.io (ORM)
- Passport.js (Autenticação)
- express-session

### Front-end
- React
- Ant Design
- TailwindCSS
- styled-components
- markdown-to-jsx

### Fluxo de Trabalho
Os usuários podem navegar pelos artigos sem autenticação.
Para criar, editar ou excluir conteúdo, os usuários devem fazer login com sua conta Google.
Os artigos são escritos em formato Markdown e enviados através da interface.
O front-end utiliza markdown-to-jsx para renderizar o conteúdo Markdown.

### Configuração e Execução
Clone o repositório
Instale as dependências: ```npm install```
Configure as variáveis de ambiente
Execute as migrações do Prisma: ```npx prisma migrate dev```
Inicie os servidores de desenvolvimento: ```npm run dev```

### Preview
![Home](https://raw.githubusercontent.com/carloshdrp/Crud-Documentacao-Express/refs/heads/main/Express%20Home.png)
![Artigo](https://raw.githubusercontent.com/carloshdrp/Crud-Documentacao-Express/refs/heads/main/Express%20Article.png)
