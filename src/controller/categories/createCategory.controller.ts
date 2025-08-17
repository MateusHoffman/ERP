import { FastifyRequest, FastifyReply } from 'fastify';
import { createCategoryValidator } from '@validator/categories/createCategory.validator';
import { createCategoryService } from '@service/categories/createCategory.service';

export const createCategoryController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const categoryData = createCategoryValidator.parse(request.body);
    const result = await createCategoryService(categoryData);
    return reply.status(201).send(result);
  } catch (error: any) {
    return reply.status(400).send({ error: error.message });
  }
};
