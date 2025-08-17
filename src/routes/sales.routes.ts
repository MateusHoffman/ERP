import { FastifyInstance } from 'fastify';
import { createSaleController } from '../controller/sales/createSale.controller';
import { findManySalesController } from '../controller/sales/findManySales.controller';
import { authorize } from '../middlewares/authorize.middleware';
import { createSaleSwagger, findManySalesSwagger } from '@swagger/sales';

export const salesRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/sales', {
    schema: createSaleSwagger,
    preHandler: authorize(['SUPERADMIN', 'ADMIN', 'MANAGER', 'CASHIER']),
    handler: createSaleController
  });

  fastify.get('/sales', {
    schema: findManySalesSwagger,
    preHandler: authorize(['SUPERADMIN', 'ADMIN', 'MANAGER']),
    handler: findManySalesController
  });
};
