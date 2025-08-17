import { z } from 'zod';

export const findManySalesValidator = z.object({
  page: z.coerce.number({
    invalid_type_error: 'A página deve ser um número'
  }).min(1, 'A página deve ser maior que 0').default(1),
  
  limit: z.coerce.number({
    invalid_type_error: 'O limite deve ser um número'
  }).min(1, 'O limite deve ser maior que 0').max(100, 'O limite não pode ser maior que 100').default(10),
  
  startDate: z.string({
    invalid_type_error: 'A data de início deve ser uma string'
  }).optional(),
  
  endDate: z.string({
    invalid_type_error: 'A data de fim deve ser uma string'
  }).optional(),
  
  minTotal: z.coerce.number({
    invalid_type_error: 'O total mínimo deve ser um número'
  }).optional(),
  
  maxTotal: z.coerce.number({
    invalid_type_error: 'O total máximo deve ser um número'
  }).optional()
});

// Interface TypeScript gerada a partir do schema Zod
export type FindManySalesInput = z.infer<typeof findManySalesValidator>;
