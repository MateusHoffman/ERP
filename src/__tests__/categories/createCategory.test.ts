import { createFastifyInstance } from '@config/fastify';
import { registerRoutes } from '@config/routes';
import { PrismaClient } from '@prisma/client';

describe('POST /categories', () => {
  let fastify: any;
  let mockPrisma: any;

  beforeAll(async () => {
    fastify = createFastifyInstance();
    registerRoutes(fastify);
    await fastify.ready();
    
    // Mock do Prisma
    mockPrisma = new PrismaClient();
  });

  afterAll(async () => {
    await fastify.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma categoria com sucesso', async () => {
    // Mock do retorno do banco de dados
    const mockCategory = {
      id: 1,
      name: 'Bebidas',
      description: 'Categoria de bebidas',
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z')
    };

    // Mock do método create do Prisma
    mockPrisma.category.create.mockResolvedValue(mockCategory);

    // Token JWT válido para ADMIN
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzQ4NzY4MDAsImV4cCI6MTczNDg4MDQwMH0.test-signature';

    const response = await fastify.inject({
      method: 'POST',
      url: '/categories',
      headers: {
        'authorization': `Bearer ${validToken}`,
        'content-type': 'application/json'
      },
      payload: {
        name: 'Bebidas',
        description: 'Categoria de bebidas'
      }
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual({
      id: 1,
      name: 'Bebidas',
      description: 'Categoria de bebidas',
      createdAt: mockCategory.createdAt
    });
  });
});
