import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');
    
    console.log('👤 Criando usuário SUPERADMIN...');
    const superAdminPassword = await argon2.hash('superadmin');
    
    const superAdmin = await prisma.user.upsert({
      where: { email: 'superadmin@erp.com' },
      update: {
        name: 'Super Administrador',
        password: superAdminPassword,
        role: 'SUPERADMIN'
      },
      create: {
        name: 'Super Administrador',
        email: 'superadmin@erp.com',
        password: superAdminPassword,
        role: 'SUPERADMIN'
      }
    });
    
    console.log('✅ Usuário SUPERADMIN criado/atualizado:', {
      id: superAdmin.id,
      name: superAdmin.name,
      email: superAdmin.email,
      role: superAdmin.role
    });
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o script se for chamado diretamente
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('\n🎯 Script de seed executado com sucesso!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Falha na execução do seed:', error);
      process.exit(1);
    });
}

export { seedDatabase };
