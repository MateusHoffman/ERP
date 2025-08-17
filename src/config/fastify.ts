import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { swaggerConfig, swaggerUiConfig } from './swagger';
import { 
  onErrorLoggingMiddleware,
  onResponseLoggingMiddleware,
  onSendLoggingMiddleware,
  preHandlerLoggingMiddleware,
} from '@middlewares/logging.middleware';

export const createFastifyInstance = () => {
  const fastify = Fastify({
    logger: false
  });

  fastify.register(cors, {
    origin: true
  });

  // Registrar Swagger com configurações específicas
  fastify.register(swagger, swaggerConfig);
  
  fastify.register(swaggerUi, swaggerUiConfig);

  fastify.addHook('preHandler', preHandlerLoggingMiddleware);
  fastify.addHook('onSend', onSendLoggingMiddleware);
  fastify.addHook('onResponse', onResponseLoggingMiddleware);
  fastify.addHook('onError', onErrorLoggingMiddleware);

  return fastify;
};