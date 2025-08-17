import { FastifyRequest, FastifyReply } from 'fastify';
import { findManyCategoriesValidator } from '@validator/categories/findManyCategories.validator';
import { findManyCategoriesService } from '@service/categories/findManyCategories.service';

export const findManyCategoriesController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const params = findManyCategoriesValidator.parse(request.query);
    const result = await findManyCategoriesService(params);
    return reply.status(200).send(result);
  } catch (error: any) {
    return reply.status(400).send({ error: error.message });
  }
};
