import { FastifyInstance } from 'fastify';
import { createUserController } from '@controller/users/createUser.controller';
import { authorize } from '@middlewares/authorize.middleware';
import { createUserSwagger } from '@swagger/users';

export const usersRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/users', {
    schema: createUserSwagger,
    preHandler: authorize(['SUPERADMIN']),
    handler: createUserController,
  });
};
