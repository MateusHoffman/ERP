import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateSaleData {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
}

export const createSaleRepository = async (saleData: CreateSaleData) => {
  const total = saleData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return await prisma.$transaction(async (tx) => {
    // Criar a venda
    const sale = await tx.sale.create({
      data: {
        userId: saleData.userId,
        total
      }
    });

    // Criar os itens da venda
    const saleItems = await Promise.all(
      saleData.items.map(item =>
        tx.saleItem.create({
          data: {
            saleId: sale.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }
        })
      )
    );

    // Atualizar estoque
    await Promise.all(
      saleData.items.map(item =>
        tx.stock.update({
          where: { productId: item.productId },
          data: {
            quantity: {
              decrement: item.quantity
            }
          }
        })
      )
    );

    return {
      sale,
      items: saleItems
    };
  });
};
