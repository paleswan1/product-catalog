import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  useGetAllProducts,
  useGetCategories,
  useGetProductsByCategory,
} from '@/infrastructure/queries/product.query';
import { ProductCard } from '@/components/product/ProductCard';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/loader/Spinner';

export default function Products() {
  const LIMIT = 12;

  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [category, setCategory] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const {
    data: allProductsData,
    isFetching: isFetchingAllProducts,
    isLoading: isLoadingAllProducts,
  } = useGetAllProducts(
    LIMIT,
    skip,
    search,
    sortBy,
    order,
    category ? { category } : undefined
  );

  const {
    data: categoryProductsData,
    isFetching: isFetchingCategoryProducts,
    isLoading: isLoadingCategoryProducts,
  } = useGetProductsByCategory(category, LIMIT, skip, search, sortBy, order);

  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();

  const data = category ? categoryProductsData : allProductsData;
  const isFetching = category
    ? isFetchingCategoryProducts
    : isFetchingAllProducts;
  const isLoading = category ? isLoadingCategoryProducts : isLoadingAllProducts;

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => {
        if (skip === 0) {
          setHasMore(data.products.length === LIMIT);
          return data.products;
        }

        const existingIds = new Set(prev.map((p) => p.id));
        const newProducts = data.products.filter(
          (p: any) => !existingIds.has(p.id)
        );

        setHasMore(newProducts.length === LIMIT);

        return [...prev, ...newProducts];
      });
    }
  }, [data, skip, LIMIT]);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isFetching && hasMore) {
        console.log('Loading more products...', {
          skip,
          hasMore,
          currentProducts: products.length,
        });
        setSkip((prev) => prev + LIMIT);
      }
    },
    [isFetching, hasMore, skip, products.length, LIMIT]
  );

  useEffect(() => {
    const currentLoader = loaderRef.current;
    if (!currentLoader) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    });

    observer.observe(currentLoader);

    return () => {
      observer.unobserve(currentLoader);
    };
  }, [handleObserver]);

  useEffect(() => {
    console.log('Filters changed, resetting pagination');
    setSkip(0);
    setProducts([]);
    setHasMore(true);
  }, [search, sortBy, order, category]);

  useEffect(() => {
    console.log('Current state:', {
      skip,
      productsCount: products.length,
      hasMore,
      isFetching,
      dataLength: data?.products?.length,
      total: data?.total,
    });
  }, [skip, products.length, hasMore, isFetching, data]);

  if (isLoading && skip === 0 && products.length === 0) {
    return (
      <div className="p-6 flex justify-center items-center min-h-64">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex gap-3 items-center flex-wrap">
        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-60"
        />

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="title">Name</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={order}
          onValueChange={(value: 'asc' | 'desc') => setOrder(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            {isLoadingCategories ? (
              <div className="flex items-center">
                <Spinner size="small" className="mr-2" />
                Loading...
              </div>
            ) : (
              <SelectValue placeholder="All Categories" />
            )}
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category: string, index: number) => (
              <SelectItem key={index} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!isLoading && data && data.products?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
  {products.map((p: any) => (
    <Link key={p.id} to={`/products/${p.id}`}>
      <ProductCard product={p} />
    </Link>
  ))}
</div>


          <div ref={loaderRef} className="text-center py-6">
            {isFetching && (
              <div className="flex justify-center items-center">
                <Spinner size="medium" />
                <span className="ml-2">Loading more products...</span>
              </div>
            )}
            {!hasMore && products.length > 0 && (
              <p className="text-muted-foreground">No more products to load.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
