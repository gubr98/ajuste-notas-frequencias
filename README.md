# PoC - Processo de Ajuste de Notas/Frequências

**Repositório GitHub:** [gubr98/ajuste-notas-frequencias](https://github.com/gubr98/ajuste-notas-frequencias.git)

Este repositório contém um **template pronto** para a prova de conceito do sistema de **Ajuste de Notas/Frequências**.  
Ele já vem com backend (Node + Express + SQLite) e um frontend simples em HTML/JS para demonstrar o fluxo básico.

## 👥 Integrantes
- Caio  
- Gustavo  
- Patrícia  
- Kevin  
- Nicole  
- Mariana  

## 📦 Tecnologias

- **Backend:** Node.js (Express) + SQLite (arquivo local)
- **Frontend:** HTML + JavaScript (páginas estáticas simples)
- **Ferramentas:** Git, VS Code (sugestão), Insomnia ou Postman para testar a API (opcional)

## 🧰 Pré-requisitos

- **Node.js 20+** (LTS) → https://nodejs.org
- **Git** → https://git-scm.com

> *Não é necessário instalar banco de dados à parte*: usamos **SQLite** (um arquivo `.sqlite`).

## ▶️ Execução rápida (Windows, macOS e Linux)

1) Abra um terminal na pasta do projeto e rode o backend:
```bash
cd backend
npm install
npm run dev
```
2) Abra o navegador em **http://localhost:3000**.  
As páginas de exemplo estão em:
- Página do aluno: **http://localhost:3000/pages/aluno.html**
- Página do docente: **http://localhost:3000/pages/docente.html**
- Página da secretaria: **http://localhost:3000/pages/secretaria.html**

3) (Opcional) Teste a API (healthcheck):
```
GET http://localhost:3000/api/health
```

## 🗂️ Estrutura de pastas

```
.
├── backend/                 # API Express + SQLite
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── db.js
│       └── routes.js
├── database/
│   └── schema.sql           # Definição das tabelas + seeds
├── frontend/
│   ├── index.html           # Landing com links
│   └── pages/               # Telas simples de exemplo (aluno, docente, secretaria)
├── docs/
│   └── EXECUCAO_LOCAL.md    # Documentação de execução local
├── .gitignore
└── README.md
```

## 🔐 Variáveis de ambiente

Crie um arquivo `backend/.env` (ou copie `backend/.env.example`) se desejar personalizar a porta ou o caminho do banco:

```
PORT=3000
DB_PATH=../database/db.sqlite
```

## 🚀 Publicar no GitHub e adicionar colaboradores

Se você ainda não subiu o projeto para o GitHub, siga os passos abaixo usando **este repositório**:

1. No terminal, dentro da pasta do projeto:
   ```bash
   git init
   git add .
   git commit -m "chore: projeto base PoC ajuste de notas"
   git branch -M main
   git remote add origin https://github.com/gubr98/ajuste-notas-frequencias.git
   git push -u origin main
   ```
2. Para adicionar os colegas como colaboradores:  
   Acesse **Settings → Collaborators → Add people** e adicione cada integrante.

## 👣 Fluxo da PoC (exemplo)

- **Aluno** envia solicitação de ajuste (nota/frequência) na tela do aluno.
- **Docente** vê solicitações pendentes e **aprova/rejeita**.
- **Secretaria** valida as aprovadas pelo docente.

As telas são simples e servem de base para o time de Frontend evoluir. O backend já fornece endpoints mínimos para CRUD de solicitações.

## 🧪 Endpoints principais (resumo)

- `GET /api/health`
- `GET /api/disciplinas`
- `GET /api/solicitacoes?status=em_analise|aprovado_docente|rejeitado_docente|validado_secretaria`
- `POST /api/solicitacoes`
- `PATCH /api/solicitacoes/:id/status`

## 🧭 Próximos passos por responsável (sugestão)

- **Frontend (Patrícia):** estilizar telas, tratar estados e erros, evoluir autenticação.
- **Backend (Kevin):** ajustar modelo, regras de autorização por perfil, testes.
- **Testes (Nicole):** cobrir fluxo completo com casos felizes e de erro.
- **Vídeo/Docs (Mariana):** gravar demo de até 1 min; atualizar README com link.