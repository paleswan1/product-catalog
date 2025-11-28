import { useQuery, useMutation, keepPreviousData } from '@tanstack/react-query';
import {
  QUERY_CATEGORIES_KEY,
  QUERY_PRODUCTS_BY_CATEGORY_KEY,
  QUERY_PRODUCTS_KEY,
} from '@/constants/query.constant';
import { productService } from '../services/productService';

export const useGetAllProducts = (
  limit: number = 10,
  skip: number = 0,
  search?: string,
  sortBy?: string,
  order: 'asc' | 'desc' = 'asc',
  filters?: Record<
    string,
    string | number | boolean | string[] | Date | undefined
  >
) => {
  return useQuery({
    queryKey: [QUERY_PRODUCTS_KEY, limit, skip, search, sortBy, order, filters],
    queryFn: () =>
      productService.getAll(limit, skip, search, sortBy, order, filters),
    staleTime: 30 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

export const useGetProductById = (id: string) =>
  useQuery({
    queryKey: [QUERY_PRODUCTS_KEY, id],
    queryFn: async () => {
      const response = await productService.getById(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 30 * 60 * 1000,
  });

export const useGetProductsByCategory = (
  category: string,
  limit: number = 12,
  skip: number = 0,
  search: string = '',
  sortBy: string = 'price',
  order: 'asc' | 'desc' = 'asc'
) => {
  return useQuery({
    queryKey: [
      QUERY_PRODUCTS_BY_CATEGORY_KEY,
      category,
      limit,
      skip,
      search,
      sortBy,
      order,
    ],
    queryFn: () =>
      productService.getProductsByCategory(
        category,
        limit,
        skip,
        search,
        sortBy,
        order
      ),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

export const useGetCategories = () =>
  useQuery({
    queryKey: [QUERY_CATEGORIES_KEY],
    queryFn: () => productService.getAllCategories(),
    staleTime: 30 * 60 * 1000,
  });

export const useDeleteProductMutation = () =>
  useMutation({
    mutationFn: productService.delete,
  });
