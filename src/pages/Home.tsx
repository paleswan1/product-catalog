import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Shop Premium Products | Home',
  description:
    'Discover our curated collection of high-quality products. Shop now for exclusive deals and featured items.',
};

export default function Home() {
  return (
    <main className="w-full">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-20 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-balance text-5xl font-bold text-white md:text-6xl">
                  Discover Your Next Favorite Product
                </h1>
                <p className="text-xl text-slate-300">
                  Explore our curated selection of premium products. From
                  cutting-edge technology to lifestyle essentials, find exactly
                  what you need.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <button className="flex items-center gap-2 px-6 py-3 rounded-md font-semibold bg-white text-slate-900 hover:bg-slate-100 transition-colors">
                    {' '}
                    Browse All Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8">
                <div>
                  <p className="text-3xl font-bold text-white">10K+</p>
                  <p className="text-sm text-slate-400">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">100K+</p>
                  <p className="text-sm text-slate-400">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">24/7</p>
                  <p className="text-sm text-slate-400">Support</p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-700">
                  <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                    <div className="text-6xl">📦</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <h2 className="text-balance text-4xl font-bold text-foreground">
            Ready to Shop?
          </h2>
          <p className="text-lg text-muted-foreground">
            Browse our complete collection of products and find exactly what
            you're looking for
          </p>
          <Link to="/products">
            <button className="flex items-center gap-2 px-6 py-3 rounded-md font-semibold bg-white text-slate-900 hover:bg-slate-100 transition-colors mx-auto">
              Start Shopping
              <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
