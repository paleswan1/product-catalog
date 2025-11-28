import Navbar from '@/components/layout/Navbar';
import Cart from '@/pages/Cart';
import Home from '@/pages/Home';
import ProductDetail from '@/pages/ProductDetail';
import Products from '@/pages/Products';
import UnAvailable from '@/pages/UnAvailable';
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

const BaseLayout = () => {
  return (
    <div className="bg-background/95">
      <Navbar />
      <main className="h-full bg-white">
        <Outlet />
      </main>
    </div>
  );
};

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/unAvailable" element={<UnAvailable />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
