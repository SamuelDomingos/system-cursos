# System Cursos

Plataforma completa de cursos online com separação de backend e frontend

![License](https://img.shields.io/github/license/SamuelDomingos/system-cursos?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/SamuelDomingos/system-cursos?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/SamuelDomingos/system-cursos?style=for-the-badge)
![Top Language](https://img.shields.io/github/languages/top/SamuelDomingos/system-cursos?style=for-the-badge)

System Cursos é uma plataforma full-stack de cursos online, com backend desenvolvido em NestJS e frontend em Next.js. A aplicação permite que instrutores publiquem cursos organizados em módulos e aulas, enquanto estudantes podem se matricular, acompanhar seu progresso e interagir com outros usuários.

O sistema conta com integração ao Stripe para pagamentos, autenticação segura via JWT, upload de thumbnails e avatares, além de funcionalidades sociais como lista de favoritos, lista de "assistir mais tarde" e sistema de amizades entre usuários.

## Status do Projeto

✅ Estável

## ✨ Funcionalidades Principais

*   **Autenticação de Usuários:** Login seguro com JWT (via Better Auth no frontend e Passport/JWT no backend), com suporte a diferentes papéis: STUDENT, INSTRUCTOR e ADMIN.
*   **Catálogo de Cursos:** Listagem de cursos com filtros por tópico, exibidos em carrosséis por categoria na página inicial.
*   **Gestão de Cursos:** Instrutores podem criar, editar e arquivar cursos com thumbnail, descrição, preço, duração e tags. Os cursos passam pelos estados DRAFT, PUBLISHED e ARCHIVED.
*   **Módulos e Aulas:** Cursos são organizados em módulos com ordem definida, cada um contendo aulas com vídeo (videoUrl) e conteúdo textual.
*   **Matrículas:** Estudantes podem se matricular em cursos após o pagamento; a rota é protegida por guard de matrícula.
*   **Acompanhamento de Progresso:** Registro do tempo assistido e status de conclusão por aula, por usuário.
*   **Integração com Stripe:** Checkout e webhooks para processamento de pagamentos de cursos, com página de sucesso pós-compra.
*   **Listas Personalizadas:** Usuários podem criar listas customizadas, bem como listas padrão de Favoritos e Assistir Mais Tarde.
*   **Sistema de Amizades:** Envio, aceitação e rejeição de solicitações de amizade entre usuários (status: PENDING, ACCEPTED, REJECTED).
*   **Tópicos de Cursos:** Cursos podem ser associados a múltiplos tópicos com grau de relevância, permitindo uma navegação temática.
*   **Perfil de Usuário:** Página de perfil com upload de avatar e informações pessoais.
*   **Temas:** Suporte a tema claro e escuro via next-themes.
*   **Carrossel e Animações:** Interface rica com Embla Carousel e Framer Motion.

## 🛠️ Tecnologias Utilizadas

### Backend
*   **Framework:** NestJS 11
*   **Linguagem:** TypeScript
*   **ORM:** Prisma
*   **Banco de Dados:** MySQL
*   **Autenticação:** Passport.js + JWT (`@nestjs/passport`, `@nestjs/jwt`)
*   **Pagamentos:** Stripe
*   **Upload de Arquivos:** Multer (`@nestjs/serve-static`)
*   **Validação:** class-validator, class-transformer
*   **Criptografia de Senhas:** bcrypt

### Frontend
*   **Framework:** Next.js 16 (App Router)
*   **Linguagem:** TypeScript
*   **Estilização:** Tailwind CSS v4, Shadcn UI (estilo New York)
*   **Autenticação:** Better Auth
*   **Pagamentos:** Stripe.js + React Stripe.js
*   **Formulários:** React Hook Form + Zod
*   **Busca de Dados:** SWR
*   **Animações:** Framer Motion
*   **Player de Vídeo:** Media Chrome
*   **Notificações:** Sonner
*   **Ícones:** Lucide React, React Icons
*   **Carrossel:** Embla Carousel

## 📂 Estrutura do Projeto

```
system-cursos/
├── backend/                  # API NestJS
│   ├── prisma/               # Schema e migrações do banco de dados
│   └── src/
│       ├── guards/           # Guards de autenticação e matrícula
│       ├── modules/
│       │   ├── auth/         # Autenticação JWT
│       │   ├── users/        # Gerenciamento de usuários
│       │   ├── courses/      # CRUD de cursos
│       │   ├── modules/      # Módulos dos cursos
│       │   ├── lessons/      # Aulas
│       │   ├── enrollments/  # Matrículas
│       │   ├── progress/     # Progresso por aula
│       │   ├── stripe/       # Pagamentos
│       │   ├── friendship/   # Sistema de amizades
│       │   ├── list/         # Listas de cursos do usuário
│       │   ├── topic/        # Tópicos/categorias
│       │   └── prisma/       # Serviço Prisma
│       └── config/           # Configurações (Multer, etc.)
└── frontend/                 # Aplicação Next.js
    ├── app/
    │   ├── auth/             # Páginas de login/registro
    │   ├── course/[id]/      # Página de detalhes do curso
    │   │   └── learn/[lessonId]/  # Player de aula
    │   ├── cart/             # Carrinho de compras
    │   └── (users)/          # Área logada
    │       ├── profile/      # Perfil do usuário
    │       ├── myCourses/    # Meus cursos e listas
    │       └── success/      # Confirmação de compra
    ├── components/           # Componentes reutilizáveis (Shadcn UI + customizados)
    ├── hooks/                # Hooks para fetch e mutations
    ├── lib/api/              # Funções de chamada à API e tipagens
    ├── contexts/             # Contextos React globais
    └── utils/                # Funções utilitárias
```

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

*   Node.js (versão 18 ou superior)
*   Um gerenciador de pacotes: npm, yarn, pnpm ou bun
*   Um banco de dados MySQL
*   Uma conta Stripe (para pagamentos)

## 🚀 Guia de Início Rápido

Siga estas instruções para configurar e executar o projeto em sua máquina local.

### 1. Clonar o Repositório

```bash
git clone https://github.com/SamuelDomingos/system-cursos.git
cd system-cursos
```

### 2. Configurar e Executar o Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` dentro da pasta `backend/` com as seguintes variáveis:

```env
DATABASE_URL="mysql://USUARIO:SENHA@HOST:3306/NOMEDOBANCO"
JWT_SECRET="UM_SEGREDO_FORTE_AQUI"
STRIPE_SECRET_KEY="sk_test_SUA_CHAVE_STRIPE"
STRIPE_WEBHOOK_SECRET="whsec_SEU_WEBHOOK_SECRET"
```

Execute as migrações do Prisma para criar o esquema do banco de dados:

```bash
npm run prisma:migrate:dev
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O backend estará disponível em `http://localhost:3000`.

### 3. Configurar e Executar o Frontend

```bash
cd ../frontend
npm install
```

Crie um arquivo `.env.local` dentro da pasta `frontend/` com as seguintes variáveis:

```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_SUA_CHAVE_PUBLICA_STRIPE"
BETTER_AUTH_SECRET="UM_SEGREDO_FORTE_AQUI"
BETTER_AUTH_URL="http://localhost:3001"
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3001](http://localhost:3001) no seu navegador para ver o resultado.

## ⚙️ Uso

*   **Página Inicial:** Exibe um banner, planos de preços e carrosséis de cursos organizados por tópico.
*   **Autenticação:** Acesse `/auth` para criar uma conta ou fazer login. Usuários podem ter o papel de STUDENT, INSTRUCTOR ou ADMIN.
*   **Explorar Cursos:** Navegue pelos cursos disponíveis e acesse a página de detalhes de cada um com módulos, aulas e informações do instrutor.
*   **Matrícula:** Após o pagamento via Stripe, o estudante é matriculado e pode acessar as aulas no player integrado.
*   **Meus Cursos:** Na área logada, visualize todos os cursos matriculados, suas listas de favoritos e de "assistir mais tarde".
*   **Perfil:** Atualize seu nome, avatar e informações pessoais.
*   **Amizades:** Envie e gerencie solicitações de amizade com outros usuários da plataforma.

## 🤝 Como Contribuir

Sua contribuição é muito bem-vinda! Se você tiver sugestões, encontrar bugs ou quiser implementar novas funcionalidades, sinta-se à vontade para abrir uma [issue](https://github.com/SamuelDomingos/system-cursos/issues) ou enviar um [pull request](https://github.com/SamuelDomingos/system-cursos/pulls).

Para contribuir, siga os passos do "Guia de Início Rápido" e certifique-se de que seu código segue as diretrizes do projeto.

## 📜 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores/Contato

*   **Samuel Domingos:** [LinkedIn](https://www.linkedin.com/in/samuel-domingos-304b461a8/)
