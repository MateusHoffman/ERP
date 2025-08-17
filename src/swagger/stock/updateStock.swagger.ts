export const updateStockSwagger = {
  tags: ['Stock'],
  summary: 'Atualizar estoque',
  description: 'Atualiza a quantidade e estoque mínimo de um produto',
  security: [{ Bearer: [] }],
  params: {
    type: 'object',
    properties: {
      productId: {
        type: 'string',
        description: 'ID do produto'
      }
    }
  },
  body: {
    type: 'object',
    required: ['quantity', 'minStock'],
    properties: {
      quantity: {
        type: 'number',
        description: 'Nova quantidade em estoque'
      },
      minStock: {
        type: 'number',
        minimum: 0,
        description: 'Estoque mínimo para alertas'
      }
    },
    examples: [
      {
        quantity: 50,
        minStock: 10
      },
      {
        quantity: 0,
        minStock: 5
      }
    ]
  },
  response: {
    200: {
      description: 'Estoque atualizado com sucesso',
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
        },
        updatedAt: { type: 'string', format: 'date-time' }
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
