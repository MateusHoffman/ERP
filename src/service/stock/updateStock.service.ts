import { updateStockRepository } from '../../repository/stock/updateStock.repository';

interface UpdateStockData {
  productId: string;
  quantity: number;
  minStock: number;
}

export const updateStockService = async (stockData: UpdateStockData) => {
  const stock = await updateStockRepository(stockData);

  return {
    id: stock.id,
    productId: stock.productId,
    quantity: stock.quantity,
    minStock: stock.minStock,
    product: stock.product,
    updatedAt: stock.updatedAt
  };
};
