import { FastifyRequest, FastifyReply } from 'fastify';
import { loginValidator } from '../../validator/auth/login.validator';
import { loginService } from '../../service/auth/login.service';

export const loginController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = loginValidator.parse(request.body);
    const result = await loginService(email, password);
    return reply.send(result);
  } catch (error: any) {
    return reply.status(400).send({ error: error.message });
  }
};
