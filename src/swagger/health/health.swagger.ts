export const healthSwagger = {
  tags: ['Health'],
  summary: 'Health Check',
  description: 'Endpoint para verificar o status de saúde da aplicação',
  response: {
    200: {
      description: 'Aplicação funcionando normalmente',
      type: 'object',
      properties: {
        status: {
          type: 'string'
        },
        timestamp: {
          type: 'string',
          format: 'date-time'
        },
        uptime: {
          type: 'number',
          description: 'Tempo de execução em segundos'
        },
        environment: {
          type: 'string',
          description: 'Ambiente de execução'
        }
      },
      examples: [
        {
          status: 'OK',
          timestamp: '2025-08-17T19:04:12.938Z',
          uptime: 8.172262786,
          environment: 'development'
        }
      ]
    },
    500: {
      description: 'Erro interno do servidor',
      type: 'object',
      properties: {
        error: {
          type: 'string'
        }
      },
      examples: [
        {
          error: 'Internal Server Error'
        }
      ]
    }
  }
};
