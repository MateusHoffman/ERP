import { FastifyRequest, FastifyReply } from 'fastify';
import { createSaleValidator } from '../../validator/sales/createSale.validator';
import { createSaleService } from '../../service/sales/createSale.service';

export const createSaleController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const saleData = createSaleValidator.parse(request.body);
    const userId = (request.user as any)?.id;
    
    if (!userId) {
      return reply.status(401).send({ error: 'Usuário não autenticado' });
    }

    const result = await createSaleService({ ...saleData, userId });
    return reply.status(201).send(result);
  } catch (error: any) {
    return reply.status(400).send({ error: error.message });
  }
};
