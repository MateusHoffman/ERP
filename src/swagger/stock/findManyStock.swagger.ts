export const findManyStockSwagger = {
  tags: ['Stock'],
  summary: 'Buscar estoque',
  description: 'Lista o estoque de produtos com paginação e filtros',
  security: [{ Bearer: [] }],
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
      lowStock: {
        type: 'boolean',
        description: 'Filtrar apenas produtos com estoque baixo (opcional)'
      },
      search: {
        type: 'string',
        description: 'Termo de busca no nome do produto (opcional)'
      }
    }
  },
  response: {
    200: {
      description: 'Lista de estoque',
      type: 'object',
      properties: {
        stock: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              productId: { type: 'string' },
              quantity: { type: 'number' },
              minStock: { type: 'number' },
              product: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  category: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' }
                    }
                  }
                }
              }
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
    },
    401: {
      description: 'Token não fornecido ou inválido',
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    },
    403: {
      description: 'Acesso negado',
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  }
};
