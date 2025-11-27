<p align="center">
  <img src="../caoragem-aumor/frontend/public/images/logo.png" width="180" alt="Logo Cãoragem e Aumor">
</p>

# 🐾 CÃORAGEM E AUMOR  
### Plataforma de Adoção de Cães — Projeto Final

---

## 📖 Sobre o Projeto

O **Cãoragem e Aumor** é uma plataforma web desenvolvida para auxiliar processos de adoção de cães resgatados.  
Criado por **Miriam Barbosa**, **Maria Calarota** e **Maria Pinto**, o projeto combina frontend, backend e base de dados para oferecer:

- Catálogo de cães disponíveis para adoção  
- Sistema de login para administração  
- Páginas individuais com fotos, descrição e dados completos  
- Formulário de interesse com envio automático por e-mail  
- Área administrativa para adicionar, editar e remover cães  
- Organização automática das imagens no servidor  

O objetivo é unir **tecnologia + bem-estar animal**, proporcionando uma plataforma simples, bonita e funcional. 🐶❤️

---

## 🚀 Tecnologias Utilizadas

### 🖥️ Frontend

- HTML5  
- CSS3 (separado por páginas)  
- JavaScript (Vanilla)  
- EJS — Templates  
- Slick Carousel  

### ⚙️ Backend

- Node.js  
- Express  
- Multer (upload de imagens)  
- Nodemailer (envio de e-mails)  
- Express-Session  
- Method-Override  

### 🗄️ Base de Dados

- SQLite  
- Scripts SQL para criação automática de tabelas  

---

## 📂 Estrutura do Projeto

### **Backend**
```
backend/
│
├── routes/
│   ├── catalogo.js
│   ├── registarCao.js
│   ├── main.js
│   ├── login.js
│   ├── formulario.js
│   ├── enviaEmail.js
│   └── routes.js
│
├── uploads/
│   └── caes/
│       └── fotos/
│           ├── Bento/
│           ├── Amora/
│           ├── Kiki/
│           └── ...
│
├── db/
│   └── caoragemaumor.db
│
└── utils/
```

### **Frontend**
```
frontend/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── fonts/
│
└── views/
    ├── partials/
    │   ├── headerMenu.ejs
    │   ├── headerRegistarCao.ejs
    │   └── footer.ejs
    │
    ├── index.ejs
    ├── catalogo.ejs
    ├── login.ejs
    ├── registarCao.ejs
    └── formulario.ejs
```

---

## 🛠️ Como Executar o Projeto

### 📌 Pré-requisitos

Antes de começar, instale:

- Node.js  
- NPM  
- SQLite ou DB Browser for SQLite  

---

### 🔧 Instalação

Clone este repositório:

```sh
git clone https://github.com/seu-repositorio/projeto.git
```

Acesse a pasta do projeto:

```sh
cd projeto
```

Instale as dependências:

```sh
npm install
```

Inicie o servidor:

```sh
npm start
```

Abra no navegador:

```
http://localhost:3000
```

---

## 🐕 Funcionalidades

### 👥 Visitantes

- Visualização completa de todos os cães  
- Página individual com:  
  - fotos  
  - idade, sexo, porte  
  - descrição  
- Formulário de adoção  
- Envio automático de e-mail ao canil  

### 🔐 Administração

- Login com validação  
- Adicionar novo cão  
- Editar dados e fotos  
- Marcar como adotado  
- Apagar cão (DELETE)  
- Gestão de galeria  

---

## 📬 Envio de E-mails

O formulário envia automaticamente os dados para:

```
caoragemaumor@gmail.com
```

Dados enviados:

- ID e nome do cão escolhido 
- Nome  
- Telefone  
- Localização  
- Email  
- Observações  

---

## 🏛️ Rotas do Sistema

### 🔓 Rotas Públicas

| Método | Rota | Descrição |
|--------|-------|-----------|
| GET | `/` | Página inicial |
| GET | `/catalogo` | Lista todos os cães |
| GET | `/caes/:id` | Página de um cão |
| GET | `/formulario/:id` | Formulário de adoção |

---

### 🔐 Rotas Administrativas

| Método | Rota | Descrição |
|--------|-------|-----------|
| GET | `/login` | Login |
| POST | `/login` | Autenticar |
| GET | `/registar` | Formulário para novo cão |
| POST | `/registar` | Registar cão |
| GET | `/editar/:id` | Editar cão |
| POST | `/editar/:id` | Atualizar cão |
| DELETE | `/caes/:id` | Apagar cão |

---

## 🗄️ Base de Dados

Tabela principal: **caes**

Campos:

- id  
- nome  
- dados (sexo, porte, condições físicas…)  
- descricao  
- adotado (boolean)  
- pastaFotos  

As imagens ficam armazenadas em:

```
/uploads/caes/fotos/NOME_DO_CAO/
```

---

## 🎨 Design & Identidade Visual

Baseado no mockup incluído no repositório:

- Paleta suave pastel  
- Pegadas e ícones temáticos  
- Layout limpo e intuitivo  
- Logótipo “Cãoragem e Aumor”  
- Páginas principais:
  - Catálogo público  
  - Página individual  
  - Formulário  
  - Login  
  - Área administrativa  

---

## 👩‍💻 Autoras

Desenvolvido por:

- **Miriam Barbosa**  
- **Maria Calarota**  
- **Maria Pinto**  

Projeto Final — Desenvolvimento Web  
Unidas por coragem, amor e… cães. 🐶💛

---

## 🐾 Licença

Projeto educacional — livre para estudo e demonstração.