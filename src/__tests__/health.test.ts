import { describe, it, expect } from '@jest/globals';

// Teste simples para verificar se o Jest está funcionando
describe('🧪 Testes de Health Check', () => {
  it('✅ Deve passar em um teste básico', () => {
    expect(1 + 1).toBe(2);
  });

  it('✅ Deve verificar se o ambiente de teste está configurado', () => {
    expect(process.env.NODE_ENV).toBeDefined();
  });

  it('✅ Deve verificar se o Jest está funcionando', () => {
    expect(typeof describe).toBe('function');
    expect(typeof it).toBe('function');
    expect(typeof expect).toBe('function');
  });
});

// Teste para verificar se as dependências estão funcionando
describe('📦 Dependências', () => {
  it('✅ Deve ter acesso ao Prisma Client', () => {
    // Este teste verifica se o Prisma Client pode ser importado
    expect(() => require('@prisma/client')).not.toThrow();
  });

  it('✅ Deve ter acesso ao Fastify', () => {
    // Este teste verifica se o Fastify pode ser importado
    expect(() => require('fastify')).not.toThrow();
  });
});
