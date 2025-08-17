module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@controller/(.*)$': '<rootDir>/src/controller/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^@repository/(.*)$': '<rootDir>/src/repository/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@service/(.*)$': '<rootDir>/src/service/$1',
    '^@swagger/(.*)$': '<rootDir>/src/swagger/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@validator/(.*)$': '<rootDir>/src/validator/$1',
    '^@__tests__/(.*)$': '<rootDir>/src/__tests__/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/server.ts',
    '!src/__tests__/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: {
        skipLibCheck: true,
        noImplicitAny: false,
        strict: false
      }
    }]
  }
};
