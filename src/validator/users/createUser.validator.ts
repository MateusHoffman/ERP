import { z } from 'zod';

export const createUserValidator = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  role: z.enum(['SUPERADMIN', 'ADMIN', 'MANAGER', 'CASHIER']).default('CASHIER')
});
