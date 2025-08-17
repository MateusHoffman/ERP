import { findManySalesRepository } from '@repository/sales/findManySales.repository';

interface FindManySalesParams {
  page: number;
  limit: number;
  startDate?: string;
  endDate?: string;
  minTotal?: number;
  maxTotal?: number;
}

export const findManySalesService = async (params: FindManySalesParams) => {
  return await findManySalesRepository(params);
};
