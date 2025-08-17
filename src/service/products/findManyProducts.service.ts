import { findManyProductsRepository } from '@repository/products/findManyProducts.repository';

interface FindManyProductsParams {
  page: number;
  limit: number;
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const findManyProductsService = async (params: FindManyProductsParams) => {
  return await findManyProductsRepository(params);
};
