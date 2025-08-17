import { PrismaClient } from '@prisma/client';

// Mock do Prisma Client
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn()
    },
    category: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn()
    },
    product: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn()
    },
    stock: {
      create: jest.fn(),
      update: jest.fn(),
      upsert: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      fields: {
        minStock: 'minStock'
      }
    },
    sale: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn()
    },
    saleItem: {
      create: jest.fn(),
      findMany: jest.fn()
    },
    $transaction: jest.fn()
  };

  return {
    PrismaClient: jest.fn(() => mockPrismaClient)
  };
});

// Mock das variáveis de ambiente
process.env.JWT_SECRET = 'test-secret-key';
process.env.DATABASE_URL = 'file:./test.db';

// Mock do logger
jest.mock('../utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  }
}));
