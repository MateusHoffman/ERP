import { createCategoryController } from '../../controller/categories/createCategory.controller';
import { createCategorySwagger } from '../../swagger/categories/createCategory.swagger';
import { FastifyRequest, FastifyReply } from 'fastify';
import { mockPrismaClient } from '../mocks/prisma.mock';

describe('createCategoryController', () => {
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });

  it('deve criar uma categoria com sucesso', async () => {
    const mockRequest = {
      body: {
        name: 'Bebidas',
        description: 'Categoria de bebidas'
      }
    };

    // Mock do retorno do banco de dados
    const mockCategory = {
      id: 1,
      name: 'Bebidas',
      description: 'Categoria de bebidas',
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z')
    };

    // Mock do método create do Prisma
    mockPrismaClient.category.create.mockResolvedValue(mockCategory);

    // Executar o controller
    await createCategoryController(
      mockRequest as FastifyRequest,
      mockReply as FastifyReply
    );

    // Verificar se o Prisma foi chamado com os dados corretos
    expect(mockPrismaClient.category.create).toHaveBeenCalledWith({
      data: {
        name: 'Bebidas',
        description: 'Categoria de bebidas'
      }
    });

    // Verificar se a resposta foi enviada corretamente
    expect(mockReply.status).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith({
      id: 1,
      name: 'Bebidas',
      description: 'Categoria de bebidas',
      createdAt: mockCategory.createdAt
    });
  });

  it('deve criar uma categoria sem descrição', async () => {
    const mockRequest = {
      body: {
        name: 'Alimentos'
      }
    };

    // Mock do retorno do banco de dados
    const mockCategory = {
      id: 2,
      name: 'Alimentos',
      description: null,
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z')
    };

    // Mock do método create do Prisma
    mockPrismaClient.category.create.mockResolvedValue(mockCategory);

    // Executar o controller
    await createCategoryController(
      mockRequest as FastifyRequest,
      mockReply as FastifyReply
    );

    // Verificar se o Prisma foi chamado com os dados corretos
    expect(mockPrismaClient.category.create).toHaveBeenCalledWith({
      data: {
        name: 'Alimentos'
      }
    });

    // Verificar se a resposta foi enviada corretamente
    expect(mockReply.status).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith({
      id: 2,
      name: 'Alimentos',
      description: null,
      createdAt: mockCategory.createdAt
    });
  });

  it('deve retornar erro quando o nome for muito curto', async () => {
    const mockRequest = {
      body: {
        name: 'A', // Nome muito curto (menos de 2 caracteres)
        description: 'Categoria inválida'
      }
    };

    // Executar o controller
    await createCategoryController(
      mockRequest as FastifyRequest,
      mockReply as FastifyReply
    );

    // Verificar se o erro foi retornado
    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: expect.stringContaining('Nome deve ter pelo menos 2 caracteres')
    });

    // Verificar que o Prisma não foi chamado
    expect(mockPrismaClient.category.create).not.toHaveBeenCalled();
  });

  it('deve retornar erro quando o nome não for fornecido', async () => {
    const mockRequest = {
      body: {
        description: 'Categoria sem nome'
      }
    };

    // Executar o controller
    await createCategoryController(
      mockRequest as FastifyRequest,
      mockReply as FastifyReply
    );

    // Verificar se o erro foi retornado
    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: expect.stringContaining('Required')
    });

    // Verificar que o Prisma não foi chamado
    expect(mockPrismaClient.category.create).not.toHaveBeenCalled();
  });

  it('deve retornar erro quando o Prisma falhar', async () => {
    const mockRequest = {
      body: {
        name: 'Bebidas',
        description: 'Categoria de bebidas'
      }
    };

    // Mock de erro do Prisma
    mockPrismaClient.category.create.mockRejectedValue(new Error('Erro no banco de dados'));

    // Executar o controller
    await createCategoryController(
      mockRequest as FastifyRequest,
      mockReply as FastifyReply
    );

    // Verificar se o erro foi retornado
    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Erro no banco de dados'
    });
  });

  it('deve ter a estrutura correta do swagger', () => {
    expect(createCategorySwagger).toBeDefined();
    expect(typeof createCategorySwagger).toBe('object');
  });
});
