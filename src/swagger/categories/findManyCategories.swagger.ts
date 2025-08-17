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
    }
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
      }
    },
    400: {
      description: 'Erro de validação',
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  }
};
