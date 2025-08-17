import { findManyCategoriesRepository } from '../../repository/categories/findManyCategories.repository';

interface FindManyCategoriesParams {
  page: number;
  limit: number;
  search?: string;
}

export const findManyCategoriesService = async (params: FindManyCategoriesParams) => {
  return await findManyCategoriesRepository(params);
};
