# PoC - Processo de Ajuste de Notas/Frequências

**Repositório GitHub:** [gubr98/ajuste-notas-frequencias](https://github.com/gubr98/ajuste-notas-frequencias.git)

Este repositório contém um **template pronto** para a prova de conceito do sistema de **Ajuste de Notas/Frequências**.  
Ele já vem com backend (Node + Express) e um frontend simples em HTML/JS para demonstrar o fluxo básico.

## Descrição do projeto 

Projeto em desenvolvimento para auxiliar na administração acadêmica. 
Desenvolvido para instituições de ensino que buscam excelência, o sistema oferece uma plataforma moderna, intuitiva e altamente segura para centralizar, organizar e gerenciar todas as informações acadêmicas.

![alt text](image.png)

## Objetivos

- **Tudo em um só lugar**: Centralizar as informações acadêmicas é um sonho para qualquer instituição. Chega de se perder em planilhas e papéis! 

- **Fácil de usar**: Uma interface intuitiva é super importante. Se for simples de navegar, todo mundo vai conseguir usar sem dor de cabeça, desde os alunos, professores, além da equipe da administração. 

- **Melhor para todos**: A experiência de alunos, professores e administradores acadêmicos sendo aprimorada é o ponto chave. Um sistema que funciona bem faz toda a diferença no dia a dia. 

- **Pensando no futuro**: A escalabilidade e a flexibilidade são ótimas porque o sistema poderá crescer junto com a instituição e se adaptar a novas tecnologias e exigências que surgirem. 

## Justificativa

- **Demanda por Consistência e Rastreabilidade de Dados**: Há uma necessidade clara por sistemas que garantam a integridade e a origem dos dados acadêmicos. 

- **Redução de Retrabalho Administrativo**: O objetivo é otimizar processos, diminuindo a necessidade de tarefas repetitivas e manuais. 

- **Aprimoramento da Experiência do Usuário**: Tornar a interação com o sistema mais agradável e eficiente para estudantes, professores e administradores. 

- **Reforço da Segurança e Conformidade Legal**: Garantir que as informações estejam protegidas e que a instituição esteja em conformidade com as leis e normas vigentes (governança digital). 




## Integrantes
- Caio Cesar Santiago Rodrigues
- Gustavo Gomes de Oliveira 
- Patrícia de carvalho
- Kevin Souza de Moura
- Nicole Alves Silva
- Mariana Moraes Bezerra

## Tecnologias

- **Backend:** Node.js (Express) + TypeORM
- **Frontend:** HTML + JavaScript + Bootstrap 4.6.2 + Font Awesome
- **Ferramentas:** Git, VS Code (sugestão), Insomnia ou Postman para testar a API (opcional)

## Pré-requisitos

- **Node.js 20+** (LTS) → https://nodejs.org
- **Git** → https://git-scm.com

## Execução rápida (Windows, macOS e Linux)

1) Abra um terminal na pasta do projeto e rode o backend:
```bash
cd backend
npm install
npm run seed  # Popula o banco com dados iniciais
npm start    # ou npm run dev para modo desenvolvimento
```

2) Abra diretamente o arquivo `frontend/index.html`.  
As páginas estão em:
- **Página inicial:** `frontend/index.html` - Landing page com acesso às áreas
- **Login do Aluno:** `frontend/pages/login-aluno.html`
- **Dashboard do Aluno:** `frontend/pages/aluno-dashboard.html`
- **Nova Solicitação:** `frontend/pages/aluno.html`
- **Login do Docente:** `frontend/pages/login-docente.html`
- **Painel do Docente:** `frontend/pages/docente.html`
- **Login da Secretaria:** `frontend/pages/login-secretaria.html`
- **Painel da Secretaria:** `frontend/pages/secretaria.html`

3) (Opcional) Teste a API (healthcheck):
```
GET http://localhost:3000/health
GET http://localhost:3000/api/health
```

## Usuários Padrão para Testes

Após executar `npm run seed`, os seguintes usuários estarão disponíveis no banco:

| Email | Nome | Perfil | Uso |
|-------|------|--------|-----|
| `aluno1@uni.edu` | Aluno Um | Aluno | **Principal para testes** - Use este email no login do aluno |
| `prof1@uni.edu` | Prof. Dois | Docente | Use no login do docente |
| `secret@uni.edu` | Secretaria | Secretária | Use no login da secretaria |
| `admin@uni.edu` | Admin | Administrador | Usuário admin |

> **Importante:** O sistema de login atual é uma simulação. Qualquer email/senha funciona, mas o sistema sempre usa `aluno1@uni.edu` internamente para garantir compatibilidade com o banco de dados.

## Estrutura de pastas

```
.
├── backend/                 # API Express + TypeORM
│   ├── package.json
│   └── src/
│       ├── controllers
│       ├── entity
│       └── routes
|       └── seeds
├── frontend/
│   ├── index.html           # Landing page com acesso às áreas
│   └── pages/               # Telas do sistema
│       ├── login-aluno.html
│       ├── login-docente.html
│       ├── login-secretaria.html
│       ├── aluno-dashboard.html
│       ├── aluno.html
│       ├── docente.html
│       └── secretaria.html
├── docs/
│   └── EXECUCAO_LOCAL.md    # Documentação de execução local
├── .gitignore
└── README.md
```

## Variáveis de ambiente

Crie um arquivo `backend/.env` (ou copie `backend/.env.example`) se desejar personalizar a porta:

```
PORT=3000
```

Para adicionar os colegas como colaboradores:  
   Acesse **Settings → Collaborators → Add people** e adicione cada integrante.

## Fluxo da PoC (exemplo)

1. **Aluno** faz login em `login-aluno.html` (qualquer email/senha funciona)
2. **Aluno** acessa o dashboard e cria uma nova solicitação em `aluno.html`
3. **Docente** faz login em `login-docente.html` e acessa `docente.html`
4. **Docente** vê solicitações pendentes e **aprova/rejeita** com observações
5. **Secretaria** faz login em `login-secretaria.html` e acessa `secretaria.html`
6. **Secretaria** valida as solicitações aprovadas pelo docente

## Ajustes Realizados no Frontend

### Estilização Moderna
- **Bootstrap 4.6.2** para layout responsivo e componentes
- **Font Awesome 6.0** para ícones
- **Google Fonts (Inter)** para tipografia moderna
- Gradientes e sombras para visual moderno
- Cards com bordas arredondadas e efeitos de hover

### Telas de Login
- Telas de login específicas para cada área (Aluno, Docente, Secretaria)
- Cada área com sua própria paleta de cores:
  - **Aluno:** Azul (#007bff)
  - **Docente:** Verde (#28a745)
  - **Secretaria:** Azul claro (#17a2b8)
- Sistema de autenticação simulado com `sessionStorage`

### Páginas Principais
- **Dashboard do Aluno:** Visualização de solicitações com status coloridos
- **Nova Solicitação:** Formulário completo para ajuste de nota ou frequência
- **Painel do Docente:** Filtros por status e ações de aprovação/rejeição
- **Painel da Secretaria:** Validação final de solicitações aprovadas

### Melhorias Técnicas
- Detecção automática de URL base da API (funciona com `file://` e HTTP)
- Mapeamento de dados do backend para o formato esperado pelo frontend
- Tratamento de erros melhorado com mensagens claras
- Lista estática de disciplinas (já que não há API de disciplinas)
- Ajustes de padding em selects para evitar corte de conteúdo

### Navegação
- Navbar simplificada e consistente em todas as páginas
- Links de navegação adaptados para cada área
- Breadcrumbs removidos para visual mais limpo

## Endpoints principais (resumo)

- `GET /health` - Healthcheck do servidor
- `GET /api/health` - Healthcheck da API
- `GET /api/requests` - Lista todas as solicitações
- `GET /api/requests?status=pending|in_review|approved|rejected|validated` - Filtra por status
- `GET /api/requests/:id` - Obtém uma solicitação específica
- `POST /api/requests` - Cria uma nova solicitação
- `PATCH /api/requests/:id/status` - Atualiza o status de uma solicitação
- `GET /api/requests/:id/history` - Histórico de uma solicitação

### Exemplo de POST para criar solicitação:
```json
POST /api/requests
Content-Type: application/json

{
  "studentEmail": "aluno1@uni.edu",
  "courseCode": "DISC1",
  "discipline": "Cálculo I",
  "description": "Nota da P1 parece incorreta",
  "evidenceFiles": null
}
```

### Exemplo de PATCH para atualizar status:
```json
PATCH /api/requests/:id/status
Content-Type: application/json

{
  "status": "approved",
  "decisionNote": "Aprovado após revisão"
}
```

### Status disponíveis:
- `pending` - Em análise (padrão)
- `in_review` - Em revisão
- `approved` - Aprovado pelo docente
- `rejected` - Rejeitado pelo docente
- `validated` - Validado pela secretaria

## Notas Importantes

- Execute `npm run seed` sempre que precisar resetar os dados de teste
- O servidor precisa estar rodando na porta 3000 para as requisições funcionarem
- As páginas HTML podem ser abertas diretamente (file://) ou servidas pelo backend
- O sistema detecta automaticamente o protocolo e ajusta as URLs da API

## Vídeo de apresentação 

[![Assista ao vídeo](https://img.youtube.com/vi/s__JRjy30lw/0.jpg)](https://youtu.be/s__JRjy30lw)
