import axiosInstance from '@/lib/clients/apiClient';

export class BaseRepository {
  protected resource: string;

  constructor(resource: string) {
    this.resource = resource;
  }

  async getAll(
    limit: number = 10,
    skip: number = 0,
    search?: string,
    sortBy?: string,
    order: 'asc' | 'desc' = 'asc',
    filters?: Record<
      string,
      string | number | boolean | string[] | Date | undefined
    >
  ) {
    let url = this.resource;
    const params: Record<string, unknown> = {};

    if (search && search.trim()) {
      url = `${this.resource}/search`;
      params.q = search.trim();
    } else {
      params.limit = limit;
      params.skip = skip;
    }

    if (sortBy?.trim()) {
      params.sortBy = sortBy.trim();
      params.order = order;
    }

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params[key] = value;
      });
    }

    const response = await axiosInstance.get(url, { params });
    return response.data;
  }

  getById(id: string) {
    return axiosInstance.get(`${this.resource}/${id}`);
  }

  create<T extends object>(data: T) {
    return axiosInstance.post(`${this.resource}/create`, data);
  }

  update<T extends object>(id: string, data: T) {
    return axiosInstance.put(`${this.resource}/${id}`, data);
  }

  patch<T extends object>(id: string, data: Partial<T>) {
    return axiosInstance.patch(`${this.resource}/${id}`, data);
  }

  delete(id: string) {
    return axiosInstance.delete(`${this.resource}/${id}`);
  }
}
