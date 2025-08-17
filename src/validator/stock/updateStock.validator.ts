import { z } from 'zod';

export const updateStockValidator = z.object({
  quantity: z.number().int('Quantidade deve ser um número inteiro'),
  minStock: z.number().int('Estoque mínimo deve ser um número inteiro').min(0, 'Estoque mínimo não pode ser negativo')
});
