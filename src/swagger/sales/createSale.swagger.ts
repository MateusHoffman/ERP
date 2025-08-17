export const createSaleSwagger = {
  tags: ['Sales'],
  summary: 'Criar nova venda',
  description: 'Cria uma nova venda e atualiza o estoque automaticamente. Valida se há estoque suficiente antes de processar a venda.',
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    required: ['items'],
    properties: {
      items: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          required: ['productId', 'quantity', 'price'],
          properties: {
            productId: {
              type: 'string',
              description: 'ID do produto'
            },
            quantity: {
              type: 'number',
              minimum: 1,
              description: 'Quantidade vendida'
            },
            price: {
              type: 'number',
              minimum: 0,
              description: 'Preço unitário'
            }
          }
        }
      }
    },
    examples: [
      {
        items: [
          {
            productId: 'cmeg1v7kj00076e0vez8fb6vl',
            quantity: 2,
            price: 12.99
          },
          {
            productId: 'cmeg1va2s000b6e0v1uewufkj',
            quantity: 1,
            price: 8.50
          }
        ]
      },
      {
        items: [
          {
            productId: 'cmeg1vcj3000f6e0v6v9c518f',
            quantity: 3,
            price: 6.99
          },
          {
            productId: 'cmeg1vh4z000j6e0vgbf4yeic',
            quantity: 2,
            price: 4.50
          }
        ]
      }
    ]
  },
  response: {
    201: {
      description: 'Venda criada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              userId: { type: 'string' },
              total: { type: 'number' },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    saleId: { type: 'string' },
                    productId: { type: 'string' },
                    quantity: { type: 'number' },
                    price: { type: 'number' }
                  }
                }
              },
              createdAt: { type: 'string', format: 'date-time' },
              message: { type: 'string' }
            }
          }
        }
      }
    },
    400: {
      description: 'Dados inválidos',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string' },
              type: { type: 'string', enum: ['VALIDATION_ERROR'] }
            }
          }
        }
      }
    },
    401: {
      description: 'Não autorizado',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          }
        }
      }
    },
    422: {
      description: 'Erro de estoque (estoque insuficiente)',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string' },
              type: { type: 'string', enum: ['STOCK_ERROR'] }
            }
          }
        }
      }
    },
    500: {
      description: 'Erro interno do servidor',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string' },
              type: { type: 'string', enum: ['INTERNAL_ERROR'] }
            }
          }
        }
      }
    }
  }
};
