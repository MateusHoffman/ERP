import { FastifyRequest, FastifyReply } from 'fastify';
import { createSaleValidator } from '../../validator/sales/createSale.validator';
import { createSaleService } from '../../service/sales/createSale.service';

export const createSaleController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const saleData = createSaleValidator.parse(request.body);
    const userId = (request as FastifyRequest & { user: { id: string; role: string; [key: string]: unknown } }).user?.id;
    
    if (!userId) {
      return reply.status(401).send({ error: 'Usuário não autenticado' });
    }

    const result = await createSaleService({ ...saleData, userId });
    return reply.status(201).send(result);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return reply.status(400).send({ error: errorMessage });
  }
};
