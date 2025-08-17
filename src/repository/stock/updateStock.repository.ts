import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UpdateStockData {
  productId: string;
  quantity: number;
  minStock: number;
}

export const updateStockRepository = async (stockData: UpdateStockData) => {
  return await prisma.stock.upsert({
    where: { productId: stockData.productId },
    update: {
      quantity: stockData.quantity,
      minStock: stockData.minStock
    },
    create: {
      productId: stockData.productId,
      quantity: stockData.quantity,
      minStock: stockData.minStock
    },
    include: {
      product: {
        include: {
          category: true
        }
      }
    }
  });
};
