import { FastifyInstance } from 'fastify';
import { logger } from '@utils/logger';
import { env } from './env';

export const startServer = async (fastify: FastifyInstance) => {
  try {
    await fastify.ready();
    
    // Gerar a especificação Swagger após o registro das rotas
    fastify.swagger();
    
    await fastify.listen({ port: env.PORT, host: env.HOST });
    logger.info(`Servidor rodando na porta ${env.PORT}`);
    logger.info(`Documentação disponível em: http://localhost:${env.PORT}/docs`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};