import { z } from 'zod';

export const createCategoryValidator = z.object({
  name: z.string({
    required_error: 'O nome da categoria é obrigatório',
    invalid_type_error: 'O nome da categoria deve ser uma string'
  }).min(2, 'Nome deve ter pelo menos 2 caracteres'),
  
  description: z.string({
    invalid_type_error: 'A descrição deve ser uma string'
  }).optional()
});

// Interface TypeScript gerada a partir do schema Zod
export type CreateCategoryInput = z.infer<typeof createCategoryValidator>;
