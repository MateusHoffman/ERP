// Mock do Prisma Client para todos os testes
export const mockPrismaClient = {
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

// Mock do módulo @prisma/client
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrismaClient)
}));

// Função helper para limpar todos os mocks
export const clearPrismaMocks = () => {
  Object.values(mockPrismaClient).forEach((model: any) => {
    if (typeof model === 'object' && model !== null) {
      Object.values(model).forEach((method: any) => {
        if (typeof method === 'function' && method.mockClear) {
          method.mockClear();
        }
      });
    }
  });
  
  if (mockPrismaClient.$transaction.mockClear) {
    mockPrismaClient.$transaction.mockClear();
  }
};

// Função helper para resetar todos os mocks
export const resetPrismaMocks = () => {
  Object.values(mockPrismaClient).forEach((model: any) => {
    if (typeof model === 'object' && model !== null) {
      Object.values(model).forEach((method: any) => {
        if (typeof method === 'function' && method.mockReset) {
          method.mockReset();
        }
      });
    }
  });
  
  if (mockPrismaClient.$transaction.mockReset) {
    mockPrismaClient.$transaction.mockReset();
  }
};
