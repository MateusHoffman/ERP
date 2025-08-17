import { z } from 'zod';

export const loginValidator = z.object({
  email: z.string({
    required_error: 'O email é obrigatório',
    invalid_type_error: 'O email deve ser uma string'
  }).email({ message: 'O email deve ser válido' }),

  password: z.string({
    required_error: 'A senha é obrigatória',
    invalid_type_error: 'A senha deve ser uma string'
  }).min(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
});

// Interface TypeScript gerada a partir do schema Zod
export type LoginInput = z.infer<typeof loginValidator>;
