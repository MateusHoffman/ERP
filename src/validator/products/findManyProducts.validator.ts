import { z } from 'zod';

export const findManyProductsValidator = z.object({
  page: z.coerce.number({
    invalid_type_error: 'A página deve ser um número'
  }).min(1, 'A página deve ser maior que 0').default(1),
  
  limit: z.coerce.number({
    invalid_type_error: 'O limite deve ser um número'
  }).min(1, 'O limite deve ser maior que 0').max(100, 'O limite não pode ser maior que 100').default(10),
  
  search: z.string({
    invalid_type_error: 'A busca deve ser uma string'
  }).optional(),
  
  categoryId: z.string({
    invalid_type_error: 'O ID da categoria deve ser uma string'
  }).optional(),
  
  minPrice: z.coerce.number({
    invalid_type_error: 'O preço mínimo deve ser um número'
  }).optional(),
  
  maxPrice: z.coerce.number({
    invalid_type_error: 'O preço máximo deve ser um número'
  }).optional()
});

// Interface TypeScript gerada a partir do schema Zod
export type FindManyProductsInput = z.infer<typeof findManyProductsValidator>;
