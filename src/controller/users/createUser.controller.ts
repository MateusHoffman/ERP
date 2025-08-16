import { FastifyRequest, FastifyReply } from 'fastify';
import { createUserValidator } from '../../validator/users/createUser.validator';
import { createUserService } from '../../service/users/createUser.service';
import { logger } from '../../utils/logger';

export const createUserController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userData = createUserValidator.parse(request.body);
    const result = await createUserService(userData);
    return reply.status(201).send(result);
  } catch (error: any) {
    logger.error(error, 'Create user error');
    
    // Tratamento específico para erro de validação Zod
    if (error?.issues) {
      const errors = error.issues.map((issue: any) => ({
        field: issue.path.join('.'),
        message: issue.message
      }));
      return reply.status(400).send({ errors });
    }
    
    // Tratamento específico para email duplicado
    if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
      return reply.status(409).send({ 
        error: 'Email já está em uso',
        message: 'Já existe um usuário cadastrado com este email'
      });
    }
    
    // Tratamento para outros erros do Prisma
    if (error?.code?.startsWith('P')) {
      return reply.status(400).send({ 
        error: 'Erro no banco de dados',
        message: 'Ocorreu um erro ao processar sua solicitação'
      });
    }
    
    return reply.status(400).send({ error: error.message });
  }
};
