import { createCategoryRepository } from '../../repository/categories/createCategory.repository';

interface CreateCategoryData {
  name: string;
  description?: string;
}

export const createCategoryService = async (categoryData: CreateCategoryData) => {
  const category = await createCategoryRepository(categoryData);

  return {
    id: category.id,
    name: category.name,
    description: category.description,
    createdAt: category.createdAt
  };
};
