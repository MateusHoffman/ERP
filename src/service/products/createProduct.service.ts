import { createProductRepository } from '@repository/products/createProduct.repository';

interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  barcode?: string;
  categoryId: string;
}

export const createProductService = async (productData: CreateProductData) => {
  const product = await createProductRepository(productData);

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    barcode: product.barcode,
    category: product.category,
    createdAt: product.createdAt
  };
};
