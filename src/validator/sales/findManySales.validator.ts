import { z } from 'zod';

export const findManySalesValidator = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  minTotal: z.coerce.number().optional(),
  maxTotal: z.coerce.number().optional()
});
