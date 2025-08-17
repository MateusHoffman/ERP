import { FastifyInstance } from 'fastify';
import { authRoutes } from '@routes/auth.routes';
import { usersRoutes } from '@routes/users.routes';
import { healthRoutes } from '@routes/health.routes';

export const registerRoutes = (fastify: FastifyInstance) => {
  fastify.register(healthRoutes);
  fastify.register(authRoutes);
  fastify.register(usersRoutes);
};