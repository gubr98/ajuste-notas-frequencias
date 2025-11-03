# Execução local detalhada

## 1) Instalar dependências

```bash
cd backend
npm install
```

## 2) Rodar a API

```bash
npm run dev
```

- A API sobe em `http://localhost:3000`
- As páginas estáticas ficam disponíveis em:
  - `/` (landing)
  - `/pages/aluno.html`
  - `/pages/docente.html`
  - `/pages/secretaria.html`

## 3) Popular dados iniciais

O arquivo `database/schema.sql` cria as tabelas e inclui alguns seeds (usuários e disciplinas).  
Isso acontece automaticamente na primeira execução do servidor.

## 4) Testar endpoints

- `GET /api/health` → checagem simples
- `GET /api/disciplinas` → lista disciplinas
- `POST /api/solicitacoes` → cria solicitação
- `GET /api/solicitacoes` → lista solicitações
- `PATCH /api/solicitacoes/:id/status` → altera status

Use Insomnia/Postman se preferir.

## 5) Troubleshooting

- Porta ocupada? Altere `PORT` no `backend/.env`.
- Banco bloqueado no Windows? Feche ferramentas que possam estar usando o arquivo `.sqlite`.