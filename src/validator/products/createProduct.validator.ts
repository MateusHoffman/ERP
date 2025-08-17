import { z } from 'zod';

export const createProductValidator = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  description: z.string().optional(),
  price: z.number().positive('Preço deve ser positivo'),
  barcode: z.string().optional(),
  categoryId: z.string().min(1, 'Categoria é obrigatória')
});
