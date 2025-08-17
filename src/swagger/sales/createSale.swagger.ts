export const createSaleSwagger = {
  tags: ['Sales'],
  summary: 'Criar nova venda',
  description: 'Cria uma nova venda e atualiza o estoque automaticamente',
  security: [{ Bearer: [] }],
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
            productId: 'product_id_here',
            quantity: 2,
            price: 4.50
          },
          {
            productId: 'another_product_id',
            quantity: 1,
            price: 8.90
          }
        ]
      }
    ]
  },
  response: {
    201: {
      description: 'Venda criada com sucesso',
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
              productId: { type: 'string' },
              quantity: { type: 'number' },
              price: { type: 'number' }
            }
          }
        },
        createdAt: { type: 'string', format: 'date-time' }
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
