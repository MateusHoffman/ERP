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
    },
    examples: [
      {
        page: 1,
        limit: 10
      },
      {
        page: 1,
        limit: 10,
        startDate: '2025-08-17',
        endDate: '2025-08-17'
      },
      {
        page: 1,
        limit: 10,
        minTotal: 25,
        maxTotal: 40
      }
    ]
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
      },
      examples: [
        {
          sales: [
            {
              id: 'cmeg1w69900116e0virg22wzj',
              userId: 'cmefy3wye00001yyq1yiqdw9s',
              total: 29.97,
              createdAt: '2025-08-17T19:00:02.350Z',
              items: [
                {
                  id: 'cmeg1w69a00136e0vhhjwc432',
                  productId: 'cmeg1vcj3000f6e0v6v9c518f',
                  quantity: 3,
                  price: 6.99,
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
                  id: 'cmeg1w69a00156e0vhdd088ro',
                  productId: 'cmeg1vh4z000j6e0vgbf4yeic',
                  quantity: 2,
                  price: 4.5,
                  product: {
                    id: 'cmeg1vh4z000j6e0vgbf4yeic',
                    name: 'Detergente Líquido',
                    category: {
                      id: 'cmeg1v31i00056e0viq8l129e',
                      name: 'Limpeza'
                    }
                  }
                }
              ]
            },
            {
              id: 'cmeg1w3if000v6e0vq3jz8yec',
              userId: 'cmefy3wye00001yyq1yiqdw9s',
              total: 34.48,
              createdAt: '2025-08-17T18:59:58.791Z',
              items: [
                {
                  id: 'cmeg1w3ih000x6e0v8p55ya9a',
                  productId: 'cmeg1v7kj00076e0vez8fb6vl',
                  quantity: 2,
                  price: 12.99,
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
                  id: 'cmeg1w3ih000z6e0v4qwrh13r',
                  productId: 'cmeg1va2s000b6e0v1uewufkj',
                  quantity: 1,
                  price: 8.5,
                  product: {
                    id: 'cmeg1va2s000b6e0v1uewufkj',
                    name: 'Feijão Preto',
                    category: {
                      id: 'cmeg1uynk00036e0vtpvjlrfv',
                      name: 'Alimentos Básicos'
                    }
                  }
                }
              ]
            }
          ],
          total: 2,
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
