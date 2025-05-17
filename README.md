# Conéctar - Sistema de Gerenciamento de Usuários
# Como acessar

Acesse a aplicação frontend hospedada em:
https://seuappfrontend.netlify.app (substitua pelo seu link real)

# Como rodar o projeto localmente ou em produção

Clonar o repositório
git clone [https://github.com/seuusuario/seuprojeto.git](https://github.com/TheDevCaio/DesafioConectar_2.0.git)
Backend: cd Backend/conectar-backend 
Frontend: cd Frontend/conectar-frontend

yarn install
Rode a aplicação em modo desenvolvimento:

yarn dev
Para buildar para produção:

yarn build

# Sobre o Projeto
Conéctar é um sistema full-stack para gerenciamento de usuários, desenvolvido com NestJS no backend e ReactJS no frontend, ambos usando TypeScript. O sistema permite cadastro, login com autenticação JWT, gerenciamento de perfis, controle de acesso baseado em roles (admin e usuário comum) e operações CRUD para usuários.

# Tecnologias Utilizadas

# Backend

NestJS (Node.js framework)

TypeScript

JWT para autenticação

PostgreSQL ou MySQL (via ORM TypeORM)

Swagger para documentação da API

Jest para testes automatizados

# Frontend

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

Frontend (.env)

REACT_APP_API_URL=http://localhost:3000/api

Documentação da API
A documentação está disponível no endpoint /api/docs do backend após rodar o projeto.

Diagrama DML do Banco: 

Table users {
  id integer [pk, increment]   
  name varchar(255) [not null]
  email varchar(255) [unique, not null]
  password varchar(255)
  role varchar(50) [not null, default: 'user']
  created_at timestamp [default: `CURRENT_TIMESTAMP`]
  updated_at timestamp [default: `CURRENT_TIMESTAMP`]
}

Contato
Se precisar de ajuda, dúvidas ou quiser contribuir, fale com o Caio no número 32988648333


![Capturar](https://github.com/user-attachments/assets/1741196f-b53b-4f52-9780-a1814bf10134)

