export const findManySalesSwagger = {
  tags: ['Sales'],
  summary: 'Buscar vendas',
  description: 'Lista todas as vendas com paginação e filtros por data e valor',
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
      startDate: {
        type: 'string',
        format: 'date',
        description: 'Data de início para filtrar (opcional)'
      },
      endDate: {
        type: 'string',
        format: 'date',
        description: 'Data de fim para filtrar (opcional)'
      },
      minTotal: {
        type: 'number',
        description: 'Valor mínimo da venda para filtrar (opcional)'
      },
      maxTotal: {
        type: 'number',
        description: 'Valor máximo da venda para filtrar (opcional)'
      }
    }
  },
  response: {
    200: {
      description: 'Lista de vendas',
      type: 'object',
      properties: {
        sales: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              userId: { type: 'string' },
              total: { type: 'number' },
              createdAt: { type: 'string', format: 'date-time' },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    productId: { type: 'string' },
                    quantity: { type: 'number' },
                    price: { type: 'number' },
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
