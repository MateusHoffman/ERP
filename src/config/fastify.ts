import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { swaggerConfig, swaggerUiConfig } from './swagger';

export const createFastifyInstance = () => {
  const fastify = Fastify({
    logger: false
  });

  // Registra middlewares
  fastify.register(cors, {
    origin: true
  });

  // Registra Swagger
  fastify.register(swagger, swaggerConfig);
  fastify.register(swaggerUi, swaggerUiConfig);

  return fastify;
};