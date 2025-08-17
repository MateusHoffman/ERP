export const createCategorySwagger = {
  tags: ['Categories'],
  summary: 'Criar nova categoria',
  description: 'Cria uma nova categoria de produtos no sistema',
  security: [{ Bearer: [] }],
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        description: 'Nome da categoria'
      },
      description: {
        type: 'string',
        description: 'Descrição da categoria (opcional)'
      }
    },
    examples: [
      {
        name: 'Alimentos Básicos',
        description: 'Produtos alimentícios básicos como arroz, feijão, farinha'
      },
      {
        name: 'Bebidas',
        description: 'Refrigerantes, sucos, água e outras bebidas'
      },
      {
        name: 'Limpeza',
        description: 'Produtos de limpeza doméstica e pessoal'
      }
    ]
  },
  response: {
    201: {
      description: 'Categoria criada com sucesso',
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' }
      },
      examples: [
        {
          id: 'cmeg1uynk00036e0vtpvjlrfv',
          name: 'Alimentos Básicos',
          description: 'Produtos alimentícios básicos como arroz, feijão, farinha',
          createdAt: '2025-08-17T18:59:05.840Z'
        },
        {
          id: 'cmeg1v0xc00046e0v49nv4lpm',
          name: 'Bebidas',
          description: 'Refrigerantes, sucos, água e outras bebidas',
          createdAt: '2025-08-17T18:59:08.784Z'
        },
        {
          id: 'cmeg1v31i00056e0viq8l129e',
          name: 'Limpeza',
          description: 'Produtos de limpeza doméstica e pessoal',
          createdAt: '2025-08-17T18:59:11.526Z'
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
          error: 'Bad Request'
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
          error: 'Acesso negado'
        }
      ]
    }
  }
};
