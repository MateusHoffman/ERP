import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateCategoryData {
  name: string;
  description?: string;
}

export const createCategoryRepository = async (categoryData: CreateCategoryData) => {
  return await prisma.category.create({
    data: categoryData
  });
};
