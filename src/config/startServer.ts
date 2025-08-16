import { FastifyInstance } from 'fastify';
import { logger } from '@utils/logger';

export const startServer = async (fastify: FastifyInstance) => {
  try {
    await fastify.ready();
    fastify.swagger();
    
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    logger.info('Servidor rodando na porta 3000');
    logger.info('Documentação disponível em: http://localhost:3000/docs');
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};