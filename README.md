# ERP Supermercado

Sistema ERP completo para gerenciamento de supermercados desenvolvido com TypeScript, Fastify e Prisma.

## 🚀 Tecnologias

- **TypeScript** - Linguagem principal
- **Fastify** - Framework web
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados
- **JWT** - Autenticação
- **Zod** - Validação de dados
- **Pino** - Logger
- **bcryptjs** - Hash de senhas

## 📁 Estrutura do Projeto

```
src/
├── config/
│   ├── database.ts
│   └── jwt.ts
├── utils/
│   └── logger.ts
├── middlewares/
│   └── authorize.middleware.ts
├── validator/
│   ├── auth/
│   ├── users/
│   ├── products/
│   ├── inventory/
│   ├── sales/
│   └── suppliers/
├── repository/
│   ├── auth/
│   ├── users/
│   ├── products/
│   ├── inventory/
│   ├── sales/
│   └── suppliers/
├── service/
│   ├── auth/
│   ├── users/
│   ├── products/
│   ├── inventory/
│   ├── sales/
│   └── suppliers/
├── controller/
│   ├── auth/
│   ├── users/
│   ├── products/
│   ├── inventory/
│   ├── sales/
│   ├── suppliers/
│   └── reports/
├── routes/
│   ├── auth.routes.ts
│   ├── users.routes.ts
│   ├── products.routes.ts
│   ├── inventory.routes.ts
│   ├── sales.routes.ts
│   ├── suppliers.routes.ts
│   └── reports.routes.ts
└── server.ts
```

## 🛠️ Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Execute as migrações:
```bash
npx prisma migrate dev
```

5. Inicie o servidor:
```bash
npm run dev
```

## 📋 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o projeto
- `npm start` - Inicia o servidor em produção

## 🔐 Autenticação e Autorização

O sistema utiliza JWT para autenticação e possui 4 níveis de acesso:

- **SUPERADMIN** - Acesso total ao sistema
- **ADMIN** - Acesso administrativo
- **MANAGER** - Acesso gerencial
- **CASHIER** - Acesso de caixa

## 📡 Endpoints da API

### Autenticação
- `POST /auth/login` - Login de usuário

### Usuários
- `POST /users` - Criar usuário (SUPERADMIN)

### Produtos
- `POST /products` - Criar produto (ADMIN, MANAGER)

### Inventário
- `POST /inventory/add-stock` - Adicionar estoque (ADMIN, MANAGER)

### Vendas
- `POST /sales` - Criar venda (ADMIN, MANAGER, CASHIER)

### Fornecedores
- `POST /suppliers` - Criar fornecedor (ADMIN, MANAGER)

### Relatórios
- `GET /reports/sales` - Relatório de vendas (ADMIN, MANAGER)
- `GET /reports/inventory` - Relatório de inventário (ADMIN, MANAGER)

### Health Check
- `GET /health` - Status do servidor

## 🔧 Desenvolvimento

### Padrões de Código

- **Arrow Functions** - Todas as funções são arrow functions
- **Controller/Service/Repository** - Arquitetura em camadas
- **Zod Validators** - Validação com `required_error` e `invalid_type_error`
- **JWT + Roles** - Autenticação e autorização
- **Pino Logger** - Logging estruturado
- **Tratamento de Erros** - Tratamento detalhado de erros

### Exemplo de Uso

```typescript
// Login
POST /auth/login
{
  "email": "admin@supermarket.com",
  "password": "123456"
}

// Criar Produto
POST /products
Authorization: Bearer <token>
{
  "name": "Arroz Integral",
  "sku": "ARROZ001",
  "price": 15.90,
  "quantity": 100
}
```

## 📊 Banco de Dados

O sistema utiliza SQLite com Prisma ORM. Os principais modelos são:

- **User** - Usuários do sistema
- **Product** - Produtos do supermercado
- **Customer** - Clientes
- **Sale** - Vendas
- **Supplier** - Fornecedores

## 🚀 Deploy

1. Compile o projeto:
```bash
npm run build
```

2. Configure as variáveis de ambiente de produção

3. Execute:
```bash
npm start
```

## 📝 Licença

Este projeto está sob a licença ISC.
# ERP
