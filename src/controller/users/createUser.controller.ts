import { FastifyRequest, FastifyReply } from 'fastify';
import { createUserValidator } from '@validator/users/createUser.validator';
import { createUserService } from '@service/users/createUser.service';

export const createUserController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userData = createUserValidator.parse(request.body);
    const result = await createUserService(userData);
    return reply.status(201).send(result);
  } catch (error: any) {
    return reply.status(400).send({ error: error.message });
  }
};
