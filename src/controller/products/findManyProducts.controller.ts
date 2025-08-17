import { FastifyRequest, FastifyReply } from 'fastify';
import { findManyProductsValidator } from '@validator/products/findManyProducts.validator';
import { findManyProductsService } from '@service/products/findManyProducts.service';

export const findManyProductsController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const params = findManyProductsValidator.parse(request.query);
    const result = await findManyProductsService(params);
    return reply.status(200).send(result);
  } catch (error: any) {
    return reply.status(400).send({ error: error.message });
  }
};
