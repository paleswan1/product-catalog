import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store/store';
import CartItem from '@/components/cart/CartItem';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, total, totalItems } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <div className="w-full min-h-screen bg-white">   {/* FULL PAGE WHITE BG */}
      {items.length === 0 ? (
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some products to get started!
          </p>
          <a
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-[#283841] text-white px-6 py-3 rounded-lg hover:bg-[#283841]/80 transition-colors duration-200 font-medium"
          >
            Continue Shopping
            <ArrowRight size={20} />
          </a>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <aside className="bg-white rounded-xl border border-gray-200 p-6 shadow-md h-fit">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({totalItems})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  to="/unAvailable"
                  className="w-full bg-[#283841] text-white py-3 rounded-lg hover:bg-[#283841]/80 transition-colors duration-200 text-center font-medium"
                >
                  Proceed to Checkout
                </Link>

                <a
                  href="/products"
                  className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center font-medium"
                >
                  Continue Shopping
                </a>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
