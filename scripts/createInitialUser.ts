import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function createInitialUser() {
  try {
    const hashedPassword = await argon2.hash('superadmin');
    
    const user = await prisma.user.create({
      data: {
        name: 'Super Administrador',
        email: 'superadmin@erp.com',
        password: hashedPassword,
        role: 'SUPERADMIN'
      }
    });

    console.log('Usuário criado com sucesso:', {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createInitialUser();
