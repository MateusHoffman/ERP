import { z } from 'zod';

export const findManyStockValidator = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  lowStock: z.coerce.boolean().optional(),
  search: z.string().optional()
});
