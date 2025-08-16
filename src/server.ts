import { createFastifyInstance } from '@config/fastify';
import { registerRoutes } from '@config/routes';
import { startServer } from '@config/startServer';

const fastify = createFastifyInstance();

registerRoutes(fastify);

startServer(fastify);