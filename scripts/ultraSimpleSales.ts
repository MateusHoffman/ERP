#!/usr/bin/env ts-node

import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🚀 Gerando 1 milhão de vendas simples...');
    
    // 1. Criar usuário
    const password = await argon2.hash('123456');
    const user = await prisma.user.upsert({
      where: { email: 'vendedor@erp.com' },
      update: {},
      create: {
        name: 'Vendedor',
        email: 'vendedor@erp.com',
        password,
        role: 'CASHIER'
      }
    });
    
    // 2. Criar categoria
    const category = await prisma.category.upsert({
      where: { name: 'Teste' },
      update: {},
      create: {
        name: 'Teste',
        description: 'Categoria teste'
      }
    });
    
    // 3. Criar produto
    const product = await prisma.product.upsert({
      where: { barcode: '123456789' },
      update: {},
      create: {
        name: 'Produto Teste',
        description: 'Produto teste',
        price: 10.00,
        barcode: '123456789',
        categoryId: category.id
      }
    });
    
    // 4. Criar estoque
    await prisma.stock.upsert({
      where: { productId: product.id },
      update: { quantity: 1000000 },
      create: {
        productId: product.id,
        quantity: 1000000,
        minStock: 5
      }
    });
    
    console.log('✅ Dados base criados');
    console.log('💰 Iniciando geração de vendas...');
    
    // 5. Gerar 1 milhão de vendas
    const startTime = Date.now();
    
    for (let i = 1; i <= 1000000; i++) {
      // Data aleatória no último ano
      const saleDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
      
      // Criar venda
      const sale = await prisma.sale.create({
        data: {
          userId: user.id,
          total: 10.00,
          createdAt: saleDate
        }
      });
      
      // Criar item da venda
      await prisma.saleItem.create({
        data: {
          saleId: sale.id,
          productId: product.id,
          quantity: 1,
          price: 10.00
        }
      });
      
      // Mostrar progresso a cada 100 mil
      if (i % 100000 === 0) {
        const progress = (i / 1000000) * 100;
        const elapsed = (Date.now() - startTime) / 1000;
        console.log(`📊 ${progress}% - ${i.toLocaleString()} vendas criadas em ${elapsed.toFixed(0)}s`);
      }
    }
    
    const totalTime = (Date.now() - startTime) / 1000;
    console.log(`\n🎉 Concluído! 1 milhão de vendas criadas em ${totalTime.toFixed(0)}s`);
    
    // Estatísticas finais
    const salesCount = await prisma.sale.count();
    const itemsCount = await prisma.saleItem.count();
    console.log(`📊 Total: ${salesCount.toLocaleString()} vendas e ${itemsCount.toLocaleString()} itens`);
    
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar
if (require.main === module) {
  main();
}
