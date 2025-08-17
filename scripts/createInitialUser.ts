import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createInitialUser() {
  try {
    const hashedPassword = await bcrypt.hash('superadmin', 10);
    
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
