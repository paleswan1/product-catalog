import { ArrowLeft, Ban } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UnAvailable() {
  return (
    <div className="w-full min-h-screen bg-white">
      {' '}
      {/* FULL PAGE WHITE BG */}
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <Ban size={64} className="mx-auto text-gray-400 mb-6" />

        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Checkout Not Available Yet
        </h1>

        <p className="text-gray-600 mb-6">
          We're still working on the checkout experience. Please check back
          soon!
        </p>

        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 bg-[#283841] text-white px-6 py-3 rounded-lg hover:bg-[#283841]/80 transition-colors duration-200 font-medium"
        >
          <ArrowLeft size={20} />
          Return to Shop
        </Link>
      </div>
    </div>
  );
}
