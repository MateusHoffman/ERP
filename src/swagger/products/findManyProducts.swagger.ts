export const findManyProductsSwagger = {
  tags: ['Products'],
  summary: 'Buscar produtos',
  description: 'Lista todos os produtos com paginação, busca e filtros',
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
      },
      categoryId: {
        type: 'string',
        description: 'ID da categoria para filtrar (opcional)'
      },
      minPrice: {
        type: 'number',
        description: 'Preço mínimo para filtrar (opcional)'
      },
      maxPrice: {
        type: 'number',
        description: 'Preço máximo para filtrar (opcional)'
      }
    }
  },
  response: {
    200: {
      description: 'Lista de produtos',
      type: 'object',
      properties: {
        products: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              price: { type: 'number' },
              barcode: { type: 'string' },
              category: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' }
                }
              },
              stock: {
                type: 'object',
                properties: {
                  quantity: { type: 'number' },
                  minStock: { type: 'number' }
                }
              },
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
