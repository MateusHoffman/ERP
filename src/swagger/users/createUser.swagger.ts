export const createUserSwagger = {
  tags: ['Users'],
  summary: 'Criar novo usuário',
  description: 'Cria um novo usuário no sistema (apenas SUPERADMIN)',
  security: [{ Bearer: [] }],
  body: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        description: 'Nome completo do usuário'
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'Email único do usuário'
      },
      password: {
        type: 'string',
        minLength: 6,
        description: 'Senha do usuário'
      },
      role: {
        type: 'string',
        enum: ['SUPERADMIN', 'ADMIN', 'MANAGER', 'CASHIER'],
        default: 'CASHIER',
        description: 'Nível de acesso do usuário'
      }
    },
    examples: [
      {
        name: 'Administrador Geral',
        email: 'admin@erp.com',
        password: 'admin123',
        role: 'ADMIN'
      },
      {
        name: 'Gerente de Loja',
        email: 'manager@erp.com',
        password: 'manager123',
        role: 'MANAGER'
      },
      {
        name: 'Caixa',
        email: 'cashier@erp.com',
        password: 'cashier123',
        role: 'CASHIER'
      }
    ]
  },
  response: {
    201: {
      description: 'Usuário criado com sucesso',
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' }
      },
      examples: [
        {
          id: 'cmeg1urp800006e0vk8nn9mcl',
          name: 'Administrador Geral',
          email: 'admin@erp.com',
          role: 'ADMIN',
          createdAt: '2025-08-17T18:58:56.828Z'
        },
        {
          id: 'cmeg1uu1900016e0vycruwah1',
          name: 'Gerente de Loja',
          email: 'manager@erp.com',
          role: 'MANAGER',
          createdAt: '2025-08-17T18:58:59.854Z'
        },
        {
          id: 'cmeg1uwh700026e0vvgjnpm60',
          name: 'Caixa',
          email: 'cashier@erp.com',
          role: 'CASHIER',
          createdAt: '2025-08-17T18:59:03.019Z'
        }
      ]
    },
    400: {
      description: 'Erro de validação',
      type: 'object',
      properties: {
        error: { type: 'string' }
      },
      examples: [
        {
          error: 'O nome deve ter pelo menos 2 caracteres.'
        },
        {
          error: 'Formato de email inválido.'
        },
        {
          error: 'A senha deve ter pelo menos 6 caracteres.'
        },
        {
          error: 'Role inválido. Use: SUPERADMIN, ADMIN, MANAGER ou CASHIER.'
        }
      ]
    },
    401: {
      description: 'Token não fornecido ou inválido',
      type: 'object',
      properties: {
        error: { type: 'string' }
      },
      examples: [
        {
          error: 'Token de autorização não fornecido'
        },
        {
          error: 'Token de autenticação inválido ou expirado.'
        }
      ]
    },
    403: {
      description: 'Acesso negado',
      type: 'object',
      properties: {
        error: { type: 'string' }
      },
      examples: [
        {
          error: 'Acesso negado. Apenas SUPERADMIN pode criar usuários.'
        },
        {
          error: 'Você não tem permissão para criar usuários com este nível de acesso.'
        }
      ]
    },
    409: {
      description: 'Email já está em uso',
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' }
      },
      examples: [
        {
          error: 'Email já está em uso.',
          message: 'Este email já está sendo utilizado por outro usuário.'
        },
        {
          error: 'Conflito: usuário já existe.',
          message: 'Não é possível criar usuário com email já cadastrado.'
        }
      ]
    }
  }
};

