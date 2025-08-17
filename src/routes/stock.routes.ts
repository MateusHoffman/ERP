import { FastifyInstance } from 'fastify';
import { updateStockController } from '../controller/stock/updateStock.controller';
import { findManyStockController } from '../controller/stock/findManyStock.controller';
import { authorize } from '../middlewares/authorize.middleware';
import { updateStockSwagger, findManyStockSwagger } from '@swagger/stock';

export const stockRoutes = async (fastify: FastifyInstance) => {
  fastify.put('/stock/:productId', {
    schema: updateStockSwagger,
    preHandler: authorize(['SUPERADMIN', 'ADMIN', 'MANAGER']),
    handler: updateStockController
  });

  fastify.get('/stock', {
    schema: findManyStockSwagger,
    preHandler: authorize(['SUPERADMIN', 'ADMIN', 'MANAGER', 'CASHIER']),
    handler: findManyStockController
  });
};
