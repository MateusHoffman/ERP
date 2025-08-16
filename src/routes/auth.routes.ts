import { FastifyInstance } from 'fastify';
import { loginController } from '../controller/auth/login.controller';
import { loginSwagger } from '@swagger/auth';

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/auth/login', {
    schema: loginSwagger,
    handler: loginController
  });
};
