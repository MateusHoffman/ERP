export const createProductSwagger = {
  tags: ['Products'],
  summary: 'Criar novo produto',
  description: 'Cria um novo produto no sistema com estoque inicial',
  security: [{ Bearer: [] }],
  body: {
    type: 'object',
    required: ['name', 'price', 'categoryId'],
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        description: 'Nome do produto'
      },
      description: {
        type: 'string',
        description: 'Descrição do produto (opcional)'
      },
      price: {
        type: 'number',
        minimum: 0,
        description: 'Preço do produto'
      },
      barcode: {
        type: 'string',
        description: 'Código de barras (opcional)'
      },
      categoryId: {
        type: 'string',
        description: 'ID da categoria do produto'
      }
    },
    examples: [
      {
        name: 'Arroz Integral',
        description: 'Arroz integral tipo 1, pacote 5kg',
        price: 12.99,
        categoryId: 'cmeg1uynk00036e0vtpvjlrfv'
      },
      {
        name: 'Feijão Preto',
        description: 'Feijão preto tipo 1, pacote 1kg',
        price: 8.50,
        categoryId: 'cmeg1uynk00036e0vtpvjlrfv'
      },
      {
        name: 'Coca-Cola',
        description: 'Refrigerante Coca-Cola 2L',
        price: 6.99,
        categoryId: 'cmeg1v0xc00046e0v49nv4lpm'
      },
      {
        name: 'Detergente Líquido',
        description: 'Detergente líquido para louças 500ml',
        price: 4.50,
        categoryId: 'cmeg1v31i00056e0viq8l129e'
      }
    ]
  },
  response: {
    201: {
      description: 'Produto criado com sucesso',
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
        createdAt: { type: 'string', format: 'date-time' }
      },
      examples: [
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
          createdAt: '2025-08-17T18:59:23.824Z'
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
