import { z } from 'zod';

export const findManyStockValidator = z.object({
  page: z.coerce.number({
    invalid_type_error: 'A página deve ser um número'
  }).min(1, 'A página deve ser maior que 0').default(1),
  
  limit: z.coerce.number({
    invalid_type_error: 'O limite deve ser um número'
  }).min(1, 'O limite deve ser maior que 0').max(100, 'O limite não pode ser maior que 100').default(10),
  
  lowStock: z.coerce.boolean({
    invalid_type_error: 'O filtro de estoque baixo deve ser um booleano'
  }).optional(),
  
  search: z.string({
    invalid_type_error: 'A busca deve ser uma string'
  }).optional()
});

// Interface TypeScript gerada a partir do schema Zod
export type FindManyStockInput = z.infer<typeof findManyStockValidator>;
