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
  const result = await createSaleRepository(saleData);

  return {
    id: result.sale.id,
    userId: result.sale.userId,
    total: result.sale.total,
    items: result.items,
    createdAt: result.sale.createdAt
  };
};
