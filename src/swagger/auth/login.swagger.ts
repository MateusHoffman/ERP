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
        password: 'admin'
      },
      {
        email: 'cashier@erp.com',
        password: 'cashier'
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
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6InN1cGVyYWRtaW5AZXJwLmNvbSIsInJvbGUiOiJTVVBFUkFETUlOIiwiaWF0IjoxNjM0NTY3ODkwLCJleHAiOjE2MzQ2NTQyOTB9LmV4ZW1wbG8tdG9rZW4',
            user: {
              id: '1234567890',
              name: 'Superadmin',
              email: 'superadmin@erp.com',
              role: 'SUPERADMIN',
              createdAt: '2024-01-15T10:30:00Z'
            }
          },
        {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImFkbWluQGVycC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MzQ1Njc4OTAsImV4cCI6MTYzNDY1NDI5MH0uZXhlbXBsby10b2tlbg',
            user: {
              id: '9876543210',
              name: 'Admin',
              email: 'admin@erp.com',
              role: 'ADMIN',
              createdAt: '2024-01-10T08:00:00Z'
            }
          },
        {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImNhc2hpZXJAZXJwLmNvbSIsInJvbGUiOiJDQVNISUVSIiwiaWF0IjoxNjM0NTY3ODkwLCJleHAiOjE2MzQ2NTQyOTB9LmV4ZW1wbG8tdG9rZW4',
            user: {
              id: '5556667778',
              name: 'Cashier',
              email: 'cashier@erp.com',
              role: 'CASHIER',
              createdAt: '2024-01-20T14:15:00Z'
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
          name: 'exemplo-erro-1',
          summary: 'Credenciais inválidas',
          description: 'Email ou senha incorretos para o sistema ERP',
          value: {
            error: 'Credenciais inválidas. Verifique seu email e senha.'
          }
        },
        {
          name: 'exemplo-erro-2',
          summary: 'Usuário não encontrado',
          description: 'Email não cadastrado no sistema ERP',
          value: {
            error: 'Usuário não encontrado no sistema.'
          }
        },
        {
          name: 'exemplo-erro-3',
          summary: 'Conta desativada',
          description: 'Usuário existe mas está desativado no sistema',
          value: {
            error: 'Conta de usuário desativada. Entre em contato com o administrador.'
          }
        },
        {
          name: 'exemplo-erro-4',
          summary: 'Campos obrigatórios',
          description: 'Email ou senha não fornecidos na requisição',
          value: {
            error: 'Email e senha são obrigatórios para autenticação.'
          }
        },
        {
          name: 'exemplo-erro-5',
          summary: 'Formato de email inválido',
          description: 'Email com formato incorreto',
          value: {
            error: 'Formato de email inválido. Use um email válido.'
          }
        },
        {
          name: 'exemplo-erro-6',
          summary: 'Senha muito curta',
          description: 'Senha com menos de 6 caracteres',
          value: {
            error: 'A senha deve ter pelo menos 6 caracteres.'
          }
        }
      ]
    }
  }
};

