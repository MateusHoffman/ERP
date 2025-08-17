import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

export const authorize = (allowedRoles: string[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authHeader = request.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.status(401).send({ error: 'Token de autorização não fornecido' });
      }

      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey123456789') as { id: string; role: string; [key: string]: unknown };
      
      if (!allowedRoles.map(role => role.toUpperCase()).includes(decoded.role)) {
        return reply.status(403).send({ error: 'Acesso negado' });
      }

      (request as FastifyRequest & { user: typeof decoded }).user = decoded;
    } catch (error) {
      logger.error(error, 'Authorization error');
      return reply.status(401).send({ error: 'Token inválido' });
    }
  };
};
