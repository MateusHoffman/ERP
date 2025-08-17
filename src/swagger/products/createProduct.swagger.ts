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
        name: 'Coca-Cola 350ml',
        description: 'Refrigerante Coca-Cola em lata',
        price: 4.50,
        barcode: '7891234567890',
        categoryId: 'category_id_here'
      },
      {
        name: 'Arroz Integral 1kg',
        description: 'Arroz integral tipo 1',
        price: 8.90,
        categoryId: 'category_id_here'
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
