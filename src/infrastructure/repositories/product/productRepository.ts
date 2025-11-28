import axiosInstance from '@/lib/clients/apiClient';
import { BaseRepository } from '../base/baseRepository';

export class ProductRepository extends BaseRepository {
  constructor() {
    super('products');
  }

  async getProductsByCategory(
    category: string,
    limit: number = 10,
    skip: number = 0,
    search?: string,
    sortBy?: string,
    order: 'asc' | 'desc' = 'asc'
  ) {
    const categoryResponse = await axiosInstance.get(
      `${this.resource}/category/${category}`
    );
    let categoryProducts =
      categoryResponse.data.products || categoryResponse.data;

    // Apply search filter if provided
    if (search && search.trim()) {
      const searchTerm = search.toLowerCase().trim();
      categoryProducts = categoryProducts.filter(
        (product: any) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting if provided
    if (sortBy?.trim()) {
      categoryProducts = categoryProducts.sort((a: any, b: any) => {
        if (sortBy === 'price') {
          return order === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sortBy === 'rating') {
          return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        } else if (sortBy === 'title') {
          return order === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        } else if (sortBy === 'brand') {
          return order === 'asc'
            ? a.brand.localeCompare(b.brand)
            : b.brand.localeCompare(a.brand);
        }
        return 0;
      });
    }

    // Apply pagination
    const total = categoryProducts.length;
    const paginatedProducts = categoryProducts.slice(skip, skip + limit);

    return {
      products: paginatedProducts,
      total,
      skip,
      limit,
    };
  }

  async getAllCategories() {
    try {
      const response = await axiosInstance.get(
        `${this.resource}/category-list`
      );
      return response.data;
    } catch (error) {
      console.error('Error getting categories', error);
      throw error;
    }
  }
}

export const productRepo = new ProductRepository();
