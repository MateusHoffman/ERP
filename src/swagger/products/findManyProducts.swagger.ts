export const findManyProductsSwagger = {
  tags: ['Products'],
  summary: 'Buscar produtos',
  description: 'Lista todos os produtos com paginação, busca e filtros',
  security: [{ bearerAuth: [] }],
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
    },
    examples: [
      {
        page: 1,
        limit: 10
      },
      {
        page: 1,
        limit: 2
      },
      {
        page: 2,
        limit: 2
      },
      {
        page: 1,
        limit: 10,
        categoryId: 'cmeg1uynk00036e0vtpvjlrfv'
      },
      {
        page: 1,
        limit: 10,
        minPrice: 5,
        maxPrice: 15
      }
    ]
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
      },
      examples: [
        {
          products: [
            {
              id: 'cmeg1v7kj00076e0vez8fb6vl',
              name: 'Arroz Integral',
              description: 'Arroz integral tipo 1, pacote 5kg',
              price: 12.99,
              barcode: '',
              category: {
                id: 'cmeg1uynk00036e0vtpvjlrfv',
                name: 'Alimentos Básicos'
              },
              stock: {
                quantity: 10,
                minStock: 5
              },
              createdAt: '2025-08-17T18:59:17.396Z'
            },
            {
              id: 'cmeg1vcj3000f6e0v6v9c518f',
              name: 'Coca-Cola',
              description: 'Refrigerante Coca-Cola 2L',
              price: 6.99,
              barcode: '',
              category: {
                id: 'cmeg1v0xc00046e0v49nv4lpm',
                name: 'Bebidas'
              },
              stock: {
                quantity: 10,
                minStock: 20
              },
              createdAt: '2025-08-17T18:59:23.824Z'
            }
          ],
          total: 4,
          page: 1,
          limit: 2,
          totalPages: 2
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
