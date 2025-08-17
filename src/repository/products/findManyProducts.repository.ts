import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface FindManyProductsParams {
  page: number;
  limit: number;
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const findManyProductsRepository = async (params: FindManyProductsParams) => {
  const { page, limit, search, categoryId, minPrice, maxPrice } = params;
  const skip = (page - 1) * limit;

  const where: any = {};
  
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } }
    ];
  }
  
  if (categoryId) {
    where.categoryId = categoryId;
  }
  
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = minPrice;
    if (maxPrice) where.price.lte = maxPrice;
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      include: {
        category: true,
        stock: true
      },
      orderBy: { name: 'asc' }
    }),
    prisma.product.count({ where })
  ]);

  return {
    products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};
