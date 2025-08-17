import { createSaleRepository } from '@repository/sales/createSale.repository';

interface CreateSaleData {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
}

export const createSaleService = async (saleData: CreateSaleData) => {
  try {
    const result = await createSaleRepository(saleData);

    return {
      id: result.sale.id,
      userId: result.sale.userId,
      total: result.sale.total,
      items: result.items,
      createdAt: result.sale.createdAt,
      message: 'Venda criada com sucesso e estoque atualizado automaticamente'
    };
  } catch (error) {
    if (error instanceof Error) {
      // Re-throw erros específicos de estoque com status apropriado
      if (error.message.includes('Estoque insuficiente') || error.message.includes('não possui registro de estoque')) {
        throw new Error(`Erro de estoque: ${error.message}`);
      }
      throw error;
    }
    throw new Error('Erro interno ao processar a venda');
  }
};
