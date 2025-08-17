export const findManyCategoriesSwagger = {
  tags: ['Categories'],
  summary: 'Buscar categorias',
  description: 'Lista todas as categorias com paginação e busca',
  querystring: {
    type: 'object',
    properties: {
      page: {
        type: 'number',
        minimum: 1,
        default: 1,
        description: 'Número da página'
      },
      limit: {
        type: 'number',
        minimum: 1,
        maximum: 100,
        default: 10,
        description: 'Quantidade de itens por página'
      },
      search: {
        type: 'string',
        description: 'Termo de busca (opcional)'
      }
    },
    examples: [
      {
        page: 1,
        limit: 10
      },
      {
        page: 1,
        limit: 10,
        search: 'alimentos'
      }
    ]
  },
  response: {
    200: {
      description: 'Lista de categorias',
      type: 'object',
      properties: {
        categories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' }
            }
          }
        },
        total: { type: 'number' },
        page: { type: 'number' },
        limit: { type: 'number' },
        totalPages: { type: 'number' }
      },
      examples: [
        {
          categories: [
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
          ],
          total: 3,
          page: 1,
          limit: 10,
          totalPages: 1
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
    }
  }
};
