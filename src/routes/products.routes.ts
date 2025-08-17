import { FastifyInstance } from 'fastify';
import { createProductController } from '@controller/products/createProduct.controller';
import { findManyProductsController } from '@controller/products/findManyProducts.controller';
import { authorize } from '@middlewares/authorize.middleware';
import { createProductSwagger, findManyProductsSwagger } from '@swagger/products';

export const productsRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/products', {
    schema: createProductSwagger,
    preHandler: authorize(['SUPERADMIN', 'ADMIN', 'MANAGER']),
    handler: createProductController
  });

  fastify.get('/products', {
    schema: findManyProductsSwagger,
    preHandler: authorize(['SUPERADMIN', 'ADMIN', 'MANAGER']),
    handler: findManyProductsController
  });
};
