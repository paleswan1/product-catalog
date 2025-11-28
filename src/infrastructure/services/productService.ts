import { productRepo } from '../repositories/product/productRepository';

export const productService = {
  getAll: (
    limit: number = 10,
    skip: number = 0,
    search?: string,
    sortBy?: string,
    order: 'asc' | 'desc' = 'asc',
    filters?: Record<
      string,
      string | number | boolean | string[] | Date | undefined
    >
  ) => productRepo.getAll(limit, skip, search, sortBy, order, filters),

  getById: (id: string) => productRepo.getById(id),

  getAllCategories: () => productRepo.getAllCategories(),

  getProductsByCategory: async (
    category: string,
    limit: number = 10,
    skip: number = 0,
    search?: string,
    sortBy?: string,
    order: 'asc' | 'desc' = 'asc'
  ) => {
    return await productRepo.getProductsByCategory(
      category,
      limit,
      skip,
      search,
      sortBy,
      order
    );
  },

  delete: (id: string) => productRepo.delete(id),
};
