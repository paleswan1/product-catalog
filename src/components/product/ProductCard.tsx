'use client';

import { addToCart } from '@/lib/slices/cartSlice';
import type { RootState } from '@/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ShoppingCart, Check, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isInCart) {
      dispatch(addToCart(product));
      toast.success(`${product.title} added to cart!`);
    }
  };

  return (
    <div className="group h-full">
      <div className="relative h-full bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={product.thumbnail || '/placeholder.svg'}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-3"
          />

          {/* Dark Overlay + Add Button on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              className={`w-11 h-11 rounded-full transition-all duration-300 flex items-center justify-center backdrop-blur-md border ${
                isInCart
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'bg-white/95 border-white/80 text-gray-900 hover:bg-white hover:scale-110'
              }`}
              title={isInCart ? 'Added to cart' : 'Add to cart'}
            >
              {isInCart ? (
                <Check size={18} className="animate-in zoom-in duration-200" />
              ) : (
                <ShoppingCart size={18} />
              )}
            </button>
          </div>

          {/* Quick View Icon */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={`/products/${product.id}`}
              className="w-9 h-9 rounded-full bg-white/95 border border-white/80 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300"
            >
              <Eye size={16} className="text-gray-900" />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col gap-3">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-gray-700">
            {product.title}
          </h3>

          {/* Description */}
          {product.description && (
            <p className="text-gray-500 text-xs line-clamp-1">
              {product.description.length > 40
                ? `${product.description.substring(0, 40)}...`
                : product.description}
            </p>
          )}

          {/* Price + Rating */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between gap-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>

              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {product.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
