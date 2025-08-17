import { z } from 'zod';

export const createSaleValidator = z.object({
  items: z.array(z.object({
    productId: z.string({
      required_error: 'O ID do produto é obrigatório',
      invalid_type_error: 'O ID do produto deve ser uma string'
    }).min(1, 'ID do produto é obrigatório'),
    
    quantity: z.number({
      required_error: 'A quantidade é obrigatória',
      invalid_type_error: 'A quantidade deve ser um número'
    }).int('Quantidade deve ser um número inteiro').positive('Quantidade deve ser um número inteiro positivo'),
    
    price: z.number({
      required_error: 'O preço é obrigatório',
      invalid_type_error: 'O preço deve ser um número'
    }).positive('Preço deve ser positivo')
  }), {
    required_error: 'Os itens da venda são obrigatórios',
    invalid_type_error: 'Os itens devem ser um array'
  }).min(1, 'Venda deve ter pelo menos um item')
});

// Interface TypeScript gerada a partir do schema Zod
export type CreateSaleInput = z.infer<typeof createSaleValidator>;
