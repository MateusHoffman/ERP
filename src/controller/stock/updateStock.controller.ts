import { FastifyRequest, FastifyReply } from 'fastify';
import { updateStockValidator } from '../../validator/stock/updateStock.validator';
import { updateStockService } from '../../service/stock/updateStock.service';

export const updateStockController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { productId } = request.params as { productId: string };
    const stockData = updateStockValidator.parse(request.body);
    const result = await updateStockService({ ...stockData, productId });
    return reply.status(200).send(result);
  } catch (error: any) {
    return reply.status(400).send({ error: error.message });
  }
};
