import { z } from 'zod';

export const updateStockValidator = z.object({
  quantity: z.number({
    required_error: 'A quantidade é obrigatória',
    invalid_type_error: 'A quantidade deve ser um número'
  }).int('Quantidade deve ser um número inteiro'),
  
  minStock: z.number({
    required_error: 'O estoque mínimo é obrigatório',
    invalid_type_error: 'O estoque mínimo deve ser um número'
  }).int('Estoque mínimo deve ser um número inteiro').min(0, 'Estoque mínimo não pode ser negativo')
});

// Interface TypeScript gerada a partir do schema Zod
export type UpdateStockInput = z.infer<typeof updateStockValidator>;
