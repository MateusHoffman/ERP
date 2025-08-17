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
    },
    examples: [
      {
        page: 1,
        limit: 10
      },
      {
        page: 1,
        limit: 10,
        lowStock: true
      },
      {
        page: 1,
        limit: 10,
        search: 'arroz'
      }
    ]
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
      },
      examples: [
        {
          stock: [
            {
              id: 'cmeg1v7kt00096e0vgk0ca9p1',
              productId: 'cmeg1v7kj00076e0vez8fb6vl',
              quantity: 10,
              minStock: 5,
              product: {
                id: 'cmeg1v7kj00076e0vez8fb6vl',
                name: 'Arroz Integral',
                category: {
                  id: 'cmeg1uynk00036e0vtpvjlrfv',
                  name: 'Alimentos Básicos'
                }
              }
            },
            {
              id: 'cmeg1va3v000d6e0v71kj33ow',
              productId: 'cmeg1va2s000b6e0v1uewufkj',
              quantity: 25,
              minStock: 15,
              product: {
                id: 'cmeg1va2s000b6e0v1uewufkj',
                name: 'Feijão Preto',
                category: {
                  id: 'cmeg1uynk00036e0vtpvjlrfv',
                  name: 'Alimentos Básicos'
                }
              }
            },
            {
              id: 'cmeg1vcjo000h6e0v4apf6w4n',
              productId: 'cmeg1vcj3000f6e0v6v9c518f',
              quantity: 10,
              minStock: 20,
              product: {
                id: 'cmeg1vcj3000f6e0v6v9c518f',
                name: 'Coca-Cola',
                category: {
                  id: 'cmeg1v0xc00046e0v49nv4lpm',
                  name: 'Bebidas'
                }
              }
            },
            {
              id: 'cmeg1vh63000l6e0v3z157qhq',
              productId: 'cmeg1vh4z000j6e0vgbf4yeic',
              quantity: 100,
              minStock: 8,
              product: {
                id: 'cmeg1vh4z000j6e0vgbf4yeic',
                name: 'Detergente Líquido',
                category: {
                  id: 'cmeg1v31i00056e0viq8l129e',
                  name: 'Limpeza'
                }
              }
            }
          ],
          total: 4,
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
    },
    401: {
      description: 'Token não fornecido ou inválido',
      type: 'object',
      properties: {
        error: { type: 'string' }
      },
      examples: [
        {
          error: 'Token inválido'
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
