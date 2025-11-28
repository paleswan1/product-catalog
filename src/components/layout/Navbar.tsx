import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 h-[8vh] transition-all duration-300
        ${scrolled ? 'bg-black/40 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}
      `}
    >
      <div
        className={`flex items-center justify-center h-full space-x-6 font-medium transition-colors duration-300
          ${scrolled ? 'text-white' : 'text-black'}
        `}
      >
        <Link to="/" className="hover:opacity-70">
          Home
        </Link>
        <Link to="/products" className="hover:opacity-70">
          Products
        </Link>
        <Link to="/cart" className="hover:opacity-70">
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
