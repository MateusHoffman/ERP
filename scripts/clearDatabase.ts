import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clearDatabase() {
  try {
    console.log('🔄 Iniciando limpeza do banco de dados...')
    
    // Ordem de exclusão considerando as dependências (foreign keys)
    // Primeiro as tabelas que dependem de outras
    console.log('🗑️  Removendo itens de venda...')
    await prisma.saleItem.deleteMany({})
    
    console.log('🗑️  Removendo vendas...')
    await prisma.sale.deleteMany({})
    
    console.log('🗑️  Removendo estoque...')
    await prisma.stock.deleteMany({})
    
    console.log('🗑️  Removendo produtos...')
    await prisma.product.deleteMany({})
    
    console.log('🗑️  Removendo categorias...')
    await prisma.category.deleteMany({})
    
    console.log('🗑️  Removendo usuários...')
    await prisma.user.deleteMany({})
    
    console.log('✅ Banco de dados limpo com sucesso!')
    console.log('📊 Todas as tabelas foram esvaziadas.')
    
  } catch (error) {
    console.error('❌ Erro ao limpar o banco de dados:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Executar o script se for chamado diretamente
if (require.main === module) {
  clearDatabase()
    .then(() => {
      console.log('🎉 Script executado com sucesso!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Falha na execução do script:', error)
      process.exit(1)
    })
}

export { clearDatabase }
