# ERP - Sistema de Gestão Empresarial

Sistema ERP desenvolvido com Node.js, Fastify, Prisma e TypeScript para gerenciamento de produtos, vendas, estoque e usuários.

## 🚀 Como executar o projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Git

### Passos para execução

1. **Clone o repositório**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd ERP
   ```

2. **Instale as dependências**
   ```bash
   npm i
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   # Copie o arquivo .env.example
   cp .env.example .env
   
   # Edite o arquivo .env com suas configurações
   nano .env
   ```

4. **Execute as migrações do banco de dados**
   ```bash
   npx prisma migrate deploy
   ```

5. **Popule o banco com dados iniciais**
   ```bash
   npm run db:seed
   ```

6. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

7. **Abra o Prisma Studio (opcional)**
   ```bash
   npm run prisma:studio
   ```

## 📋 Funcionalidades

- **Autenticação**: Sistema de login com JWT
- **Usuários**: Gerenciamento de usuários do sistema
- **Categorias**: Organização de produtos por categorias
- **Produtos**: Cadastro e consulta de produtos
- **Vendas**: Registro e consulta de vendas
- **Estoque**: Controle de estoque em tempo real

## 🛠️ Tecnologias utilizadas

- **Backend**: Node.js + Fastify
- **Banco de dados**: SQLite (via Prisma)
- **ORM**: Prisma
- **Autenticação**: JWT
- **Documentação**: Swagger/OpenAPI
- **Linguagem**: TypeScript

## 📁 Estrutura do projeto

```
src/
├── config/          # Configurações do sistema
├── controller/      # Controladores das rotas
├── middlewares/     # Middlewares personalizados
├── repository/      # Camada de acesso a dados
├── routes/          # Definição das rotas
├── service/         # Lógica de negócio
├── swagger/         # Documentação da API
├── utils/           # Utilitários
└── validator/       # Validação de dados
```

## 🔧 Scripts disponíveis

- `npm run dev`: Inicia o servidor em modo desenvolvimento
- `npm run build`: Compila o projeto TypeScript
- `npm run start`: Inicia o servidor em produção
- `npm run db:seed`: Popula o banco com dados iniciais
- `npm run prisma:studio`: Abre a interface do Prisma Studio

## 📖 Documentação da API

Após iniciar o servidor, a documentação Swagger estará disponível em:
```
http://localhost:3000/documentation
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
