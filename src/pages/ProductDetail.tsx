'use client';

import { addToCart } from '@/lib/slices/cartSlice';
import type { RootState } from '@/lib/store/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useGetProductById } from '@/infrastructure/queries/product.query';
import { Spinner } from '@/components/loader/Spinner';
import { Heart, Share2, Star, Package, Truck, RotateCcw } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isFetching } = useGetProductById(id!);

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item) => item?.id === product?.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isInCart) {
      dispatch(addToCart(product));
      toast.success(`${product.title} added to cart!`);
    }
  };

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100">
        <Spinner size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100 px-4">
        <div className="text-center max-w-md">
          <p className="text-xl text-stone-600 mb-4">Product not found</p>
          <p className="text-sm text-stone-500 mb-6">
            The product you're looking for isn't available.
          </p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-stone-900 text-stone-50 rounded-lg font-medium hover:bg-stone-800 transition-colors"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/products"
            className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-2"
          >
            ← Back
          </Link>
          <span className="text-xs text-stone-500 uppercase tracking-widest">
            {product.category}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="flex flex-col gap-4">
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden aspect-square">
              <img
                src={product.images?.[0] || product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md transition-all"
              >
                <Heart
                  size={20}
                  className={
                    isWishlisted
                      ? 'fill-red-500 text-red-500'
                      : 'text-stone-600'
                  }
                />
              </button>
            </div>

            {product.images.slice(0, 3).map((img: string, idx: number) => (
              <div
                key={idx}
                className="w-20 h-20 rounded-lg bg-white shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              >
                <img
                  src={img || '/placeholder.svg'}
                  alt={`View ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 mb-4 leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < Math.round(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-stone-600">
                    {product.rating.toFixed(1)} •{' '}
                    <span className="text-stone-500">1,240 reviews</span>
                  </span>
                </div>
              )}

              <p className="text-lg text-stone-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="border-y border-stone-200 py-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-semibold text-stone-900">
                  ${product.price}
                </span>
                <span className="text-lg text-stone-500 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-green-600 font-medium">
                Save ${(product.price * 0.2).toFixed(2)}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg">
                <Truck size={24} className="text-stone-600" />
                <span className="text-xs text-center text-stone-600 font-medium">
                  Free Shipping
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg">
                <RotateCcw size={24} className="text-stone-600" />
                <span className="text-xs text-center text-stone-600 font-medium">
                  30-Day Return
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg">
                <Package size={24} className="text-stone-600" />
                <span className="text-xs text-center text-stone-600 font-medium">
                  Secure Pack
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-stone-600 hover:bg-stone-50"
                  >
                    −
                  </button>

                  <span className="px-4 py-2 min-w-12 text-center font-medium">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-stone-600 hover:bg-stone-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart}
                  className={`flex-1 px-8 py-4 rounded-lg font-semibold transition-all shadow-lg 
                            ${
                              isInCart
                                ? 'bg-emerald-500 text-white cursor-not-allowed'
                                : 'bg-stone-900 text-white hover:bg-stone-800 hover:shadow-xl'
                            }
                          `}
                >
                  {isInCart ? 'Added to Cart' : 'Add to Cart'}
                </button>

                <button className="px-4 py-4 border-2 border-stone-300 text-stone-900 rounded-lg hover:bg-stone-50 transition-colors flex items-center justify-center">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
              <p className="text-sm text-stone-600 mb-3 font-medium">
                ✓ Authenticity Guaranteed
              </p>
              <p className="text-sm text-stone-600 mb-3 font-medium">
                ✓ Official Distributor
              </p>
              <p className="text-sm text-stone-600 font-medium">
                ✓ Premium Quality Assured
              </p>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="mt-20 border-t border-stone-200 pt-12">
          <h2 className="text-2xl font-serif text-stone-900 mb-6">
            Product Specifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500 mb-2">
                Category
              </p>
              <p className="text-lg font-medium text-stone-900">
                {product.category}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500 mb-2">
                Rating
              </p>
              <p className="text-lg font-medium text-stone-900">
                {product.rating?.toFixed(1)}/5
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500 mb-2">
                Price
              </p>
              <p className="text-lg font-medium text-stone-900">
                ${product.price}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500 mb-2">
                Availability
              </p>
              <p className="text-lg font-medium text-green-600">In Stock</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
