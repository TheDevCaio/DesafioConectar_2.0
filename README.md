Conéctar - Sistema de Gerenciamento de Usuários
Como acessar
Acesse a aplicação frontend hospedada em:
https://seuappfrontend.netlify.app (substitua pelo seu link real)

Como rodar o projeto localmente
1. Clonar o repositório
bash
Copiar
Editar
git clone https://github.com/seuusuario/seuprojeto.git
cd seuprojeto
2. Rodar o backend (NestJS + TypeScript)
Entre na pasta do backend:

bash
Copiar
Editar
cd backend
Instale as dependências:

bash
Copiar
Editar
yarn install
Rode a aplicação em modo desenvolvimento:

bash
Copiar
Editar
yarn start:dev
Para buildar para produção:

bash
Copiar
Editar
yarn build
Para rodar o build gerado:

bash
Copiar
Editar
yarn start:prod
3. Rodar o frontend (ReactJS + TypeScript)
Entre na pasta do frontend:

bash
Copiar
Editar
cd ../frontend
Instale as dependências:

bash
Copiar
Editar
yarn install
Rode a aplicação em modo desenvolvimento:

bash
Copiar
Editar
yarn dev
Para buildar para produção:

bash
Copiar
Editar
yarn build
Para rodar o build gerado (usando serve, por exemplo):

bash
Copiar
Editar
yarn serve
Sobre o Projeto
Conéctar é um sistema full-stack para gerenciamento de usuários, desenvolvido com NestJS no backend e ReactJS no frontend, ambos usando TypeScript. O sistema permite cadastro, login com autenticação JWT, gerenciamento de perfis, controle de acesso baseado em roles (admin e usuário comum) e operações CRUD para usuários.

Tecnologias Utilizadas
Backend

NestJS (Node.js framework)

TypeScript

JWT para autenticação

PostgreSQL ou MySQL (via ORM TypeORM)

Swagger para documentação da API

Jest para testes automatizados

Frontend

ReactJS

TypeScript

React Router para rotas

Context API para estado global

Styled Components para estilização

Axios para chamadas HTTP

Responsividade para mobile e desktop

Funcionalidades Principais
Registro e login de usuários com autenticação segura via JWT

Perfis de usuário com diferentes permissões (admin e user)

CRUD completo de usuários (admin pode listar e gerenciar todos)

Filtros e ordenação na listagem de usuários

Tela amigável de login, cadastro, perfil e listagem (para admin)

Sistema preparado para login social via Google ou Microsoft (opcional)

Documentação da API via Swagger

Testes automatizados backend (unitários e integração)

Pré-requisitos
Node.js instalado (versão recomendada >= 16)

Yarn instalado (opcional, pode usar npm)

Banco de dados PostgreSQL ou MySQL configurado e rodando

Variáveis de ambiente configuradas (exemplo .env nos diretórios backend e frontend)

Configuração das Variáveis de Ambiente
Backend (.env)
env
Copiar
Editar
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=seu_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=seu_banco
JWT_SECRET=seu_segredo_jwt
Frontend (.env)
env
Copiar
Editar
REACT_APP_API_URL=http://localhost:3000/api
Comandos resumidos
Ação	Backend	Frontend
Instalar dependências	yarn install	yarn install
Rodar em dev	yarn start:dev	yarn dev
Build produção	yarn build	yarn build
Rodar build	yarn start:prod	yarn serve

Documentação da API
A documentação está disponível no endpoint /api/docs do backend após rodar o projeto.

Contato
Se precisar de ajuda, dúvidas ou quiser contribuir, fale com a equipe Conéctar.
