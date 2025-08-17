import { healthRoutes } from '@routes/health.routes';

describe('health', () => {
  let fastify: any;

  beforeEach(async () => {
    fastify = require('fastify')();
    
    await healthRoutes(fastify);
    
    await fastify.ready();
  });

  afterEach(async () => {
    if (fastify) {
      await fastify.close();
    }
  });

  it('deve retornar status de saúde com sucesso', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/health'
    });

    expect(response.statusCode).toBe(200);

    const responseBody = JSON.parse(response.body);
    
    // Verificar se todas as propriedades estão presentes
    expect(responseBody).toHaveProperty('status');
    expect(responseBody).toHaveProperty('timestamp');
    expect(responseBody).toHaveProperty('uptime');
    expect(responseBody).toHaveProperty('environment');
    
    // Verificar valores específicos
    expect(responseBody.status).toBe('OK');
    expect(responseBody.environment).toBe('test'); // Jest define NODE_ENV=test por padrão
    
    // Verificar se timestamp é uma string ISO válida
    expect(responseBody.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    
    // Verificar se uptime é um número positivo
    expect(typeof responseBody.uptime).toBe('number');
    expect(responseBody.uptime).toBeGreaterThanOrEqual(0);
  });

  it('deve retornar environment correto quando NODE_ENV está definido', async () => {
    // Definir NODE_ENV para teste
    process.env.NODE_ENV = 'production';
    
    const response = await fastify.inject({
      method: 'GET',
      url: '/health'
    });

    expect(response.statusCode).toBe(200);

    const responseBody = JSON.parse(response.body);
    expect(responseBody.environment).toBe('production');
  });

  it('deve retornar environment correto quando NODE_ENV é undefined', async () => {
    // Remover NODE_ENV para teste
    delete process.env.NODE_ENV;
    
    const response = await fastify.inject({
      method: 'GET',
      url: '/health'
    });

    expect(response.statusCode).toBe(200);

    const responseBody = JSON.parse(response.body);
    expect(responseBody.environment).toBe('development');
  });

  it('deve retornar erro 404 para métodos não suportados', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/health'
    });

    expect(response.statusCode).toBe(404);
  });
});
