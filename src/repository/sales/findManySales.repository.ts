import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface FindManySalesParams {
  page: number;
  limit: number;
  startDate?: string;
  endDate?: string;
  minTotal?: number;
  maxTotal?: number;
}

export const findManySalesRepository = async (params: FindManySalesParams) => {
  const { page, limit, startDate, endDate, minTotal, maxTotal } = params;
  const skip = (page - 1) * limit;

  const where: any = {};
  
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt.gte = new Date(startDate);
    if (endDate) where.createdAt.lte = new Date(endDate);
  }
  
  if (minTotal || maxTotal) {
    where.total = {};
    if (minTotal) where.total.gte = minTotal;
    if (maxTotal) where.total.lte = maxTotal;
  }

  const [sales, total] = await Promise.all([
    prisma.sale.findMany({
      where,
      skip,
      take: limit,
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.sale.count({ where })
  ]);

  return {
    sales,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};
