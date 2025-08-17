import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface FindManyCategoriesParams {
  page: number;
  limit: number;
  search?: string;
}

export const findManyCategoriesRepository = async (params: FindManyCategoriesParams) => {
  const { page, limit, search } = params;
  const skip = (page - 1) * limit;

  const where = search ? {
    OR: [
      { name: { contains: search } },
      { description: { contains: search } }
    ]
  } : {};

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: 'asc' }
    }),
    prisma.category.count({ where })
  ]);

  return {
    categories,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};
