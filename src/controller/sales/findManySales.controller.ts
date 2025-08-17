import { FastifyRequest, FastifyReply } from 'fastify';
import { findManySalesValidator } from '@validator/sales/findManySales.validator';
import { findManySalesService } from '@service/sales/findManySales.service';

export const findManySalesController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const params = findManySalesValidator.parse(request.query);
    const result = await findManySalesService(params);
    return reply.status(200).send(result);
  } catch (error: any) {
    return reply.status(400).send({ error: error.message });
  }
};
