import { z } from 'zod';

export const createSaleValidator = z.object({
  items: z.array(z.object({
    productId: z.string().min(1, 'ID do produto é obrigatório'),
    quantity: z.number().int().positive('Quantidade deve ser um número inteiro positivo'),
    price: z.number().positive('Preço deve ser positivo')
  })).min(1, 'Venda deve ter pelo menos um item')
});
