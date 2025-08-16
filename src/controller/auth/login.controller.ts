import { FastifyRequest, FastifyReply } from 'fastify';
import { loginValidator } from '../../validator/auth/login.validator';
import { loginService } from '../../service/auth/login.service';
import { logger } from '../../utils/logger';

export const loginController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = loginValidator.parse(request.body);
    const result = await loginService(email, password);
    return reply.send(result);
  } catch (error: any) {
    logger.error(error, 'Login error');
    if (error?.issues) {
      const errors = error.issues.map((issue: any) => ({
        field: issue.path.join('.'),
        message: issue.message
      }));
      return reply.status(400).send({ errors });
    }
    return reply.status(400).send({ error: error.message });
  }
};
