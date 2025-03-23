<div align="center">

# Desafio Técnico Backend - CRM Vendas

Esse projeto faz parte do desafio técnico da empresa Intrasocial, e consiste API REST para gerenciamento de clientes e agentes em um sistema de CRM de Vendas




</div>

## 💻 Pré Requisitos

- Ter o <a href="https://nodejs.org/en">Node</a> ou <a href="https://github.com/nvm-sh/nvm">NVM</a> instalado na sua máquina;
- Ter o <a href="https://www.docker.com">Docker</a> instalado na sua máquina;
- Crie um arquivo .env na raiz do projeto seguindo a estrutura do arquivo .env.example;

## ⚙️ Rodando o projeto localmente

1. Instalação dos pacotes

```bash
npm i
```

2. Execute o contêiner no Docker

```bash
docker compose up -d
```

3. Crie um arquivo .env seguindo o exemplo do arquivo .env.example

```plaintext
DATABASE_URL='mongodb://root:123456@localhost:27017/crm-vendas?authSource=admin'
PORT = 7000
MONGO_INITDB_DATABASE=crm-vendas
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=123456

```

4. Execute a aplicação

```bash
 npm run start:dev
```

## 👋 Executando os Testes

Execute o comando a seguir para iniciar os testes:

```bash
npm run test
```

## 🚀 Rodando o deploy da aplicação

Acesse o seguinte link para acessar o deploy da aplicação:

```bash
https://backend-crm-vendas.vercel.app/api/v1
```

## ✨ Documentação

Acesse o seguinte link para acessar a documentação:

**Localmente**

```bash
http://localhost:7000/api/v1/docs
```

ou

**Deploy**

```bash
https://backend-crm-vendas.vercel.app/api/v1/docs
```

## 🤗 Conceitos utilizados

- Arquitetura Hexagonal

## 🎯 Tecnologias Utilizadas

<p>
  <img style='margin: 5px;' src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white'/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/-MongoDB-4DB33D?style=flat&logo=mongodb&logoColor=white'/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white'/>
  </p>

<br><br>

### 👩🏽‍💻 Desenvolvido por Talita Araujo

<div align="left">
  <a href = "mailto:talitacumi.araujo@gmail.com"><img src="https://img.shields.io/badge/-Gmail-db4a39?style=for-the-badge&logo=gmail&logoColor=white"></a>
  <a href="https://www.linkedin.com/in/talitaaraujodev" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
</div>
