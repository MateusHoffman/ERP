# ERP Supermercado - MVP

Um sistema ERP básico para supermercados desenvolvido com Node.js, Fastify, Prisma e TypeScript.

## 🚀 Funcionalidades

### Usuários e Autenticação
- ✅ Sistema de login com JWT
- ✅ Controle de acesso baseado em roles (SUPERADMIN, ADMIN, MANAGER, CASHIER)
- ✅ CRUD de usuários

### Categorias
- ✅ Criação de categorias de produtos
- ✅ Listagem com paginação e busca
- ✅ Acesso restrito a ADMIN e MANAGER

### Produtos
- ✅ Cadastro de produtos com categoria
- ✅ Código de barras opcional
- ✅ Criação automática de estoque inicial
- ✅ Listagem com filtros por categoria, preço e busca
- ✅ Acesso restrito a ADMIN e MANAGER

### Estoque
- ✅ Controle de quantidade em estoque
- ✅ Estoque mínimo configurável
- ✅ Filtro para produtos com estoque baixo
- ✅ Atualização de estoque
- ✅ Acesso restrito a ADMIN e MANAGER

### Vendas
- ✅ Registro de vendas com múltiplos itens
- ✅ Atualização automática do estoque
- ✅ Cálculo automático do total
- ✅ Histórico de vendas com filtros
- ✅ Acesso para CASHIER, MANAGER e ADMIN

## 🛠️ Tecnologias

- **Backend**: Node.js + Fastify
- **Banco de Dados**: SQLite + Prisma ORM
- **Autenticação**: JWT
- **Validação**: Zod
- **Documentação**: Swagger/OpenAPI
- **Linguagem**: TypeScript

## 📁 Estrutura do Projeto

```
src/
├── config/          # Configurações do servidor
├── controller/      # Controllers das requisições
├── middlewares/     # Middlewares de autenticação e logging
├── repository/      # Camada de acesso a dados
├── routes/          # Definição das rotas
├── service/         # Lógica de negócio
├── swagger/         # Documentação da API
├── types/           # Tipos TypeScript
└── utils/           # Utilitários
```

## 🔐 Endpoints da API

### Autenticação
- `POST /auth/login` - Login de usuário

### Usuários
- `POST /users` - Criar usuário (SUPERADMIN)

### Categorias
- `POST /categories` - Criar categoria (ADMIN, MANAGER)
- `GET /categories` - Listar categorias (Público)

### Produtos
- `POST /products` - Criar produto (ADMIN, MANAGER)
- `GET /products` - Listar produtos (Público)

### Estoque
- `PUT /stock/:productId` - Atualizar estoque (ADMIN, MANAGER)
- `GET /stock` - Listar estoque (ADMIN, MANAGER, CASHIER)

### Vendas
- `POST /sales` - Criar venda (ADMIN, MANAGER, CASHIER)
- `GET /sales` - Listar vendas (ADMIN, MANAGER)

## 🚀 Como Executar

1. **Instalar dependências**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**
   ```bash
   cp env.example .env
   # Editar .env com suas configurações
   ```

3. **Executar migrações**
   ```bash
   npx prisma migrate dev
   ```

4. **Gerar cliente Prisma**
   ```bash
   npx prisma generate
   ```

5. **Iniciar servidor**
   ```bash
   npm run dev
   ```

6. **Acessar documentação**
   - Swagger UI: http://localhost:3000/documentation

## 🔑 Roles e Permissões

- **SUPERADMIN**: Acesso total ao sistema
- **ADMIN**: Gerenciamento de produtos, categorias, estoque e vendas
- **MANAGER**: Gerenciamento de produtos, categorias, estoque e vendas
- **CASHIER**: Acesso a produtos, estoque e criação de vendas

## 📊 Banco de Dados

O sistema utiliza SQLite com os seguintes modelos principais:

- **User**: Usuários do sistema
- **Category**: Categorias de produtos
- **Product**: Produtos cadastrados
- **Stock**: Controle de estoque
- **Sale**: Registro de vendas
- **SaleItem**: Itens de cada venda

## 🔄 Próximos Passos (Não MVP)

- Relatórios de vendas e estoque
- Gestão de fornecedores
- Controle de preços e promoções
- Integração com sistemas de pagamento
- Dashboard administrativo
- Notificações de estoque baixo
- Backup automático do banco

## 📝 Licença

Este projeto é um MVP educacional para demonstração de arquitetura de software.
