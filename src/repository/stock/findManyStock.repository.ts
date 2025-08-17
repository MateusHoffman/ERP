import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface FindManyStockParams {
  page: number;
  limit: number;
  lowStock?: boolean;
  search?: string;
}

export const findManyStockRepository = async (params: FindManyStockParams) => {
  const { page, limit, lowStock, search } = params;
  const skip = (page - 1) * limit;

  const where: any = {};
  
  if (lowStock) {
    where.quantity = {
      lte: prisma.stock.fields.minStock
    };
  }
  
  if (search) {
    where.product = {
      OR: [
        { name: { contains: search } },
        { description: { contains: search } }
      ]
    };
  }

  const [stock, total] = await Promise.all([
    prisma.stock.findMany({
      where,
      skip,
      take: limit,
      include: {
        product: {
          include: {
            category: true
          }
        }
      },
      orderBy: { quantity: 'asc' }
    }),
    prisma.stock.count({ where })
  ]);

  return {
    stock,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};
