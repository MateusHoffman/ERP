import { FastifyInstance } from 'fastify';
import { authRoutes } from '@routes/auth.routes';
import { usersRoutes } from '@routes/users.routes';
import { healthRoutes } from '@routes/health.routes';
import { categoriesRoutes } from '@routes/categories.routes';
import { productsRoutes } from '@routes/products.routes';
import { stockRoutes } from '@routes/stock.routes';
import { salesRoutes } from '@routes/sales.routes';

export const registerRoutes = (fastify: FastifyInstance) => {
  fastify.register(healthRoutes);
  fastify.register(authRoutes);
  fastify.register(usersRoutes);
  fastify.register(categoriesRoutes);
  fastify.register(productsRoutes);
  fastify.register(stockRoutes);
  fastify.register(salesRoutes);
};
