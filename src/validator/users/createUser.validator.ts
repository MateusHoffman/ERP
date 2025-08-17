import { z } from 'zod';

export const createUserValidator = z.object({
  name: z.string({
    required_error: 'O nome é obrigatório',
    invalid_type_error: 'O nome deve ser uma string'
  }).min(2, 'Nome deve ter pelo menos 2 caracteres'),
  
  email: z.string({
    required_error: 'O email é obrigatório',
    invalid_type_error: 'O email deve ser uma string'
  }).email('Email inválido'),
  
  password: z.string({
    required_error: 'A senha é obrigatória',
    invalid_type_error: 'A senha deve ser uma string'
  }).min(6, 'Senha deve ter pelo menos 6 caracteres'),
  
  role: z.enum(['SUPERADMIN', 'ADMIN', 'MANAGER', 'CASHIER'], {
    required_error: 'O cargo é obrigatório',
    invalid_type_error: 'O cargo deve ser um dos valores válidos'
  }).default('CASHIER')
});

// Interface TypeScript gerada a partir do schema Zod
export type CreateUserInput = z.infer<typeof createUserValidator>;
