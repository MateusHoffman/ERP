import { findManyStockRepository } from '@repository/stock/findManyStock.repository';

interface FindManyStockParams {
  page: number;
  limit: number;
  lowStock?: boolean;
  search?: string;
}

export const findManyStockService = async (params: FindManyStockParams) => {
  return await findManyStockRepository(params);
};
