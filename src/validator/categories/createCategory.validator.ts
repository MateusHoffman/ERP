import { z } from 'zod';

export const createCategoryValidator = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  description: z.string().optional()
});
