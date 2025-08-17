import { authRoutes } from '@routes/auth.routes';
import { mockPrismaClient } from '@__tests__/mocks/prisma.mock';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

jest.mock('argon2', () => ({
  verify: jest.fn()
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}));

jest.mock('@config/jwt', () => ({
  jwtConfig: {
    secret: 'test-secret',
    expiresIn: '1h'
  }
}));

describe('login', () => {
  let fastify: any;

  beforeEach(async () => {
    jest.clearAllMocks();
    
    fastify = require('fastify')();
    
    await authRoutes(fastify);
    
    await fastify.ready();
  });

  afterEach(async () => {
    if (fastify) {
      await fastify.close();
    }
  });

  it('deve fazer login com sucesso', async () => {
    const mockUser = {
      id: "1234567890",
      name: "Superadmin",
      email: "superadmin@erp.com",
      password: "hash-da-senha-mockada",
      role: "SUPERADMIN",
      createdAt: new Date("2024-01-15T10:30:00Z")
    };
    
    mockPrismaClient.user.findUnique.mockResolvedValue(mockUser);
    
    (argon2.verify as jest.Mock).mockResolvedValue(true);
    
    (jwt.sign as jest.Mock).mockReturnValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6InN1cGVyYWRtaW5AZXJwLmNvbSIsInJvbGUiOiJTVVBFUkFETUlOIiwiaWF0IjoxNjM0NTY3ODkwLCJleHAiOjE2MzQ2NTQyOTB9LmV4ZW1wbG8tdG9rZW4");

    const response = await fastify.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: "superadmin@erp.com",
        password: "superadmin"
      }
    });

    expect(response.statusCode).toBe(200);

    const responseBody = JSON.parse(response.body);
    expect(responseBody).toHaveProperty('token');
    expect(responseBody).toHaveProperty('user');
    
    expect(responseBody.user).toEqual({
      id: "1234567890",
      name: "Superadmin",
      email: "superadmin@erp.com",
      role: "SUPERADMIN",
      createdAt: expect.stringMatching(/^2024-01-15T10:30:00/)
    });

    expect(mockPrismaClient.user.findUnique).toHaveBeenCalledWith({ 
      where: { email: "superadmin@erp.com" } 
    });

    expect(argon2.verify).toHaveBeenCalledWith("hash-da-senha-mockada", "superadmin");

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: "1234567890", role: "SUPERADMIN" },
      'test-secret',
      { expiresIn: '1h' }
    );
  });

  it('deve retornar erro 400 quando validação falhar (email inválido)', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: "email-invalido",
        password: "senha123"
      }
    });

    expect(response.statusCode).toBe(400);
    
    const responseBody = JSON.parse(response.body);
    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toMatch(/Bad Request|O email deve ser válido/);
  });

  it('deve retornar erro 400 quando validação falhar (senha muito curta)', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: "teste@email.com",
        password: "123"
      }
    });

    expect(response.statusCode).toBe(400);
    
    const responseBody = JSON.parse(response.body);
    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toMatch(/Bad Request|A senha deve ter pelo menos 6 caracteres/);
  });

  it('deve retornar erro 400 quando usuário não for encontrado', async () => {
    mockPrismaClient.user.findUnique.mockResolvedValue(null);

    const response = await fastify.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: "usuario@inexistente.com",
        password: "senha123"
      }
    });

    expect(response.statusCode).toBe(400);
    
    const responseBody = JSON.parse(response.body);
    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBe('Usuário não encontrado');
  });

  it('deve retornar erro 400 quando senha for incorreta', async () => {
    const mockUser = {
      id: "1234567890",
      name: "Superadmin",
      email: "superadmin@erp.com",
      password: "hash-da-senha-mockada",
      role: "SUPERADMIN",
      createdAt: new Date("2024-01-15T10:30:00Z")
    };
    
    mockPrismaClient.user.findUnique.mockResolvedValue(mockUser);
    
    (argon2.verify as jest.Mock).mockResolvedValue(false);

    const response = await fastify.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: "superadmin@erp.com",
        password: "senha-errada"
      }
    });

    expect(response.statusCode).toBe(400);
    
    const responseBody = JSON.parse(response.body);
    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBe('Senha incorreta');
  });
});
