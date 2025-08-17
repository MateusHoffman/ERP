// Importar o mock do Prisma
import './mocks/prisma.mock';

// Mock das variáveis de ambiente
process.env.JWT_SECRET = 'test-secret-key';
process.env.DATABASE_URL = 'file:./test.db';

// Mock do logger
jest.mock('@utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  }
}));
