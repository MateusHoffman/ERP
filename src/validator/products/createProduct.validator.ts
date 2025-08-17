import { z } from 'zod';

export const createProductValidator = z.object({
  name: z.string({
    required_error: 'O nome do produto é obrigatório',
    invalid_type_error: 'O nome do produto deve ser uma string'
  }).min(2, 'Nome deve ter pelo menos 2 caracteres'),
  
  description: z.string({
    invalid_type_error: 'A descrição deve ser uma string'
  }).optional(),
  
  price: z.number({
    required_error: 'O preço é obrigatório',
    invalid_type_error: 'O preço deve ser um número'
  }).positive('Preço deve ser positivo'),
  
  barcode: z.string({
    invalid_type_error: 'O código de barras deve ser uma string'
  }).optional(),
  
  categoryId: z.string({
    required_error: 'A categoria é obrigatória',
    invalid_type_error: 'O ID da categoria deve ser uma string'
  }).min(1, 'Categoria é obrigatória')
});

// Interface TypeScript gerada a partir do schema Zod
export type CreateProductInput = z.infer<typeof createProductValidator>;
