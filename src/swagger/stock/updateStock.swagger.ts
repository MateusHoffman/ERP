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
    },
    examples: [
      {
        productId: 'cmeg1v7kj00076e0vez8fb6vl'
      },
      {
        productId: 'cmeg1va2s000b6e0v1uewufkj'
      }
    ]
  },
  body: {
    type: 'object',
    required: ['quantity', 'operation', 'minStock'],
    properties: {
      quantity: {
        type: 'number',
        minimum: 0,
        description: 'Quantidade para operação de estoque'
      },
      operation: {
        type: 'string',
        enum: ['ADD', 'REMOVE', 'SET'],
        description: 'Tipo de operação: ADD (adicionar), REMOVE (remover), SET (definir)'
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
        operation: 'ADD',
        minStock: 5
      },
      {
        quantity: 10,
        operation: 'REMOVE',
        minStock: 20
      },
      {
        quantity: 25,
        operation: 'SET',
        minStock: 15
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
      },
      examples: [
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
          },
          updatedAt: '2025-08-17T19:00:58.284Z'
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
          },
          updatedAt: '2025-08-17T19:01:13.801Z'
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
