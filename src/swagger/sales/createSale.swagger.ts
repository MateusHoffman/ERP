export const createSaleSwagger = {
  tags: ['Sales'],
  summary: 'Criar nova venda',
  description: 'Cria uma nova venda e atualiza o estoque automaticamente',
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
      },
      examples: [
        {
          id: 'cmeg1w3if000v6e0vq3jz8yec',
          userId: 'cmefy3wye00001yyq1yiqdw9s',
          total: 34.48,
          items: [
            {
              id: 'cmeg1w3ih000x6e0v8p55ya9a',
              productId: 'cmeg1v7kj00076e0vez8fb6vl',
              quantity: 2,
              price: 12.99
            },
            {
              id: 'cmeg1w3ih000z6e0v4qwrh13r',
              productId: 'cmeg1va2s000b6e0v1uewufkj',
              quantity: 1,
              price: 8.5
            }
          ],
          createdAt: '2025-08-17T18:59:58.791Z'
        },
        {
          id: 'cmeg1w69900116e0virg22wzj',
          userId: 'cmefy3wye00001yyq1yiqdw9s',
          total: 29.97,
          items: [
            {
              id: 'cmeg1w69a00136e0vhhjwc432',
              productId: 'cmeg1vcj3000f6e0v6v9c518f',
              quantity: 3,
              price: 6.99
            },
            {
              id: 'cmeg1w69a00156e0vhdd088ro',
              productId: 'cmeg1vh4z000j6e0vgbf4yeic',
              quantity: 2,
              price: 4.5
            }
          ],
          createdAt: '2025-08-17T19:00:02.350Z'
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
