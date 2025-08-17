export const createCategorySwagger = {
  tags: ['Categories'],
  summary: 'Criar nova categoria',
  description: 'Cria uma nova categoria de produtos no sistema',
  security: [{ Bearer: [] }],
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        description: 'Nome da categoria'
      },
      description: {
        type: 'string',
        description: 'Descrição da categoria (opcional)'
      }
    },
    examples: [
      {
        name: 'Bebidas',
        description: 'Categoria para bebidas em geral'
      },
      {
        name: 'Limpeza',
        description: 'Produtos de limpeza doméstica'
      },
      {
        name: 'Alimentos',
        description: 'Alimentos não perecíveis'
      }
    ]
  },
  response: {
    201: {
      description: 'Categoria criada com sucesso',
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
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
