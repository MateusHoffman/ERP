import { FastifyRequest, FastifyReply } from 'fastify';
import { createProductValidator } from '@validator/products/createProduct.validator';
import { createProductService } from '@service/products/createProduct.service';

export const createProductController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const productData = createProductValidator.parse(request.body);
    const result = await createProductService(productData);
    return reply.status(201).send(result);
  } catch (error: any) {
    return reply.status(400).send({ error: error.message });
  }
};
