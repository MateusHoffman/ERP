import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  barcode?: string;
  categoryId: string;
}

export const createProductRepository = async (productData: CreateProductData) => {
  const product = await prisma.product.create({
    data: productData,
    include: {
      category: true
    }
  });

  // Criar estoque inicial
  await prisma.stock.create({
    data: {
      productId: product.id,
      quantity: 0,
      minStock: 5
    }
  });

  return product;
};
