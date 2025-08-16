import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { logger } from '@utils/logger';
import { authRoutes } from '@routes/auth.routes';
import { usersRoutes } from '@routes/users.routes';
import { healthRoutes } from '@routes/health.routes';
import { swaggerConfig, swaggerUiConfig } from '@config/swagger';

const fastify = Fastify({
  logger: false
});

fastify.register(cors, {
  origin: true
});

fastify.register(swagger, swaggerConfig);
fastify.register(swaggerUi, swaggerUiConfig);

fastify.register(authRoutes);
fastify.register(usersRoutes);
fastify.register(healthRoutes);

const start = async () => {
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

start();
