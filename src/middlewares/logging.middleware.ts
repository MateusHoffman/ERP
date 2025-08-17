import { FastifyRequest, FastifyReply } from 'fastify';
import { logger } from '@utils/logger';
import { env } from '@config/env';

export const preHandlerLoggingMiddleware = async (
  request: FastifyRequest,
) => {
  const startTime = Date.now();
  
  if (env.NODE_ENV === 'production') {
    logger.info({
      type: 'preHandler',
      request,
    });
  } else {
    logger.info({
      type: 'preHandler',
      endpoint: request.url,
      method: request.method,
      query: request.query,
      params: request.params,
      body: request.body,
    });
  }

  (request as any).startTime = startTime;
};

export const onSendLoggingMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: string | Buffer
) => {
  try {
    (request as any).responsePayload = payload;
  } catch (error) {
    console.error('Erro no logging onSend:', error);
  }
};

export const onResponseLoggingMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const startTime = (request as any).startTime || Date.now();
    const responseTime = Date.now() - startTime;
    
    if (env.NODE_ENV === 'production') {
      logger.info({
        type: 'onResponse',
        request,
        reply: {
          ...reply,
          responseTimeMs: `${responseTime} ms`
        }
      });
    } else {
      const responseData = (request as any).responsePayload;
      let parsedData = 'No data';
      
      if (responseData) {
        try {
          parsedData = JSON.parse(responseData.toString());
        } catch {
          parsedData = responseData.toString();
        }
      }
      
      logger.info({
        type: 'onResponse',
        request: {
          endpoint: request.url,
          method: request.method,
          query: request.query,
          params: request.params,
          body: request.body,
        },
        reply: {
          statusCode: reply.statusCode,
          responseTimeMs: `${responseTime} ms`,
          data: parsedData
        }
      });
    }
  } catch (error) {
    console.error('Erro no logging de resposta:', error);
  }
};

export const onErrorLoggingMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
  error: Error
) => {
  try {
    if (env.NODE_ENV === 'production') {
      logger.error({
        type: 'onError',
        error,
        request,
        reply,
      });
    } else {
      logger.error({
        type: 'onError',
        endpoint: request.url,
        method: request.method,
        error: {
          message: error.message,
          stack: error.stack
        },
        statusCode: reply.statusCode
      });
    }
  } catch (loggingError) {
    console.error('Erro no logging de erro:', loggingError);
  }
};
