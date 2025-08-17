export const loginSwagger = {
  tags: ['Auth'],
  summary: 'Fazer login no sistema',
  description: 'Autentica um usuário e retorna um token JWT',
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Email do usuário'
      },
      password: {
        type: 'string',
        minLength: 6,
        description: 'Senha do usuário'
      }
    },
    examples: [
      {
        email: 'superadmin@erp.com',
        password: 'superadmin'
      },
      {
        email: 'admin@erp.com',
        password: 'admin123'
      },
      {
        email: 'manager@erp.com',
        password: 'manager123'
      },
      {
        email: 'cashier@erp.com',
        password: 'cashier123'
      }
    ]
  },
  response: {
    200: {
      description: 'Login realizado com sucesso',
      type: 'object',
      properties: {
        token: {
          type: 'string',
          description: 'Token JWT para autenticação'
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        }
      },
      examples: [
        {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZWZ5M3d5ZTAwMDAxeXlxMXlpcWR3OXMiLCJyb2xlIjoiU1VQRVJBRE1JTiIsImlhdCI6MTc1NTQ1NzEyNywiZXhwIjoxNzU1NTQzNTI3fQ.SJ2RfQCLyzzrnh-kgfOV3vR5HaMYYaf6G4T97mN4gIw',
          user: {
            id: 'cmefy3wye00001yyq1yiqdw9s',
            name: 'Super Administrador',
            email: 'superadmin@erp.com',
            role: 'SUPERADMIN',
            createdAt: '2025-08-17T17:14:05.079Z'
          }
        },
        {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZWcxdXJwODAwMDA2ZTB2azhubjltY2wiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTU0NTcyMDksImV4cCI6MTc1NTU0MzYwOX0.0DdEChvqAvZxIJV-n5qJCOMqWZ16vU0p-kB85jXNp7w',
          user: {
            id: 'cmeg1urp800006e0vk8nn9mcl',
            name: 'Administrador Geral',
            email: 'admin@erp.com',
            role: 'ADMIN',
            createdAt: '2025-08-17T18:58:56.828Z'
          }
        },
        {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZWcxdXUxOTAwMDE2ZTB2eWNydXdhaDEiLCJyb2xlIjoiTUFOQUdFUiIsImlhdCI6MTc1NTQ1NzIxNSwiZXhwIjoxNzU1NTQzNjE1fQ.HN_PbuNDh43cAj-mzEfLyYI6zX8Mko6w4muzIvJeY64',
          user: {
            id: 'cmeg1uu1900016e0vycruwah1',
            name: 'Gerente de Loja',
            email: 'manager@erp.com',
            role: 'MANAGER',
            createdAt: '2025-08-17T18:58:59.854Z'
          }
        },
        {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZWcxdXdoNzAwMDI2ZTB2dmdqbnBtNjAiLCJyb2xlIjoiQ0FTSElFUiIsImlhdCI6MTc1NTQ1NzIyMiwiZXhwIjoxNzU1NTQzNjIyfQ.Xy8wVv-GYAAvKRaPe1PYymPm7zSAYQbAmjq12z0SMkY',
          user: {
            id: 'cmeg1uwh700026e0vvgjnpm60',
            name: 'Caixa',
            email: 'cashier@erp.com',
            role: 'CASHIER',
            createdAt: '2025-08-17T18:59:03.019Z'
          }
        }
      ]
    },
    400: {
      description: 'Erro de validação ou credenciais inválidas',
      type: 'object',
      properties: {
        error: { type: 'string' }
      },
      examples: [
        {
          error: 'Credenciais inválidas. Verifique seu email e senha.'
        },
        {
          error: 'Usuário não encontrado'
        },
        {
          error: 'Conta de usuário desativada. Entre em contato com o administrador.'
        },
        {
          error: 'Email e senha são obrigatórios para autenticação.'
        },
        {
          error: 'Formato de email inválido. Use um email válido.'
        },
        {
          error: 'A senha deve ter pelo menos 6 caracteres.'
        }
      ]
    }
  }
};

