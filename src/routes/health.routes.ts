import { FastifyInstance } from 'fastify';
import { healthSwagger } from '@swagger/health';

export const healthRoutes = async (fastify: FastifyInstance) => {
  // Adiciona a documentação Swagger para o health check
  fastify.get('/health', {
    schema: healthSwagger,
    handler: async () => {
      return {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
      };
    }
  });
};
