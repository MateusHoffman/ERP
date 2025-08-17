import { FastifyInstance } from 'fastify';
import { createCategoryController } from '@controller/categories/createCategory.controller';
import { findManyCategoriesController } from '@controller/categories/findManyCategories.controller';
import { authorize } from '@middlewares/authorize.middleware';
import { createCategorySwagger, findManyCategoriesSwagger } from '@swagger/categories';

export const categoriesRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/categories', {
    schema: createCategorySwagger,
    preHandler: authorize(['SUPERADMIN', 'ADMIN', 'MANAGER']),
    handler: createCategoryController
  });

  fastify.get('/categories', {
    schema: findManyCategoriesSwagger,
    handler: findManyCategoriesController
  });
};
