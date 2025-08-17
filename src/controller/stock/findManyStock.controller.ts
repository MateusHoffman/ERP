import { FastifyRequest, FastifyReply } from 'fastify';
import { findManyStockValidator } from '@validator/stock/findManyStock.validator';
import { findManyStockService } from '@service/stock/findManyStock.service';

export const findManyStockController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const params = findManyStockValidator.parse(request.query);
    const result = await findManyStockService(params);
    return reply.status(200).send(result);
  } catch (error: any) {
    return reply.status(400).send({ error: error.message });
  }
};
