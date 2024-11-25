import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../lib/store';
import { useState } from 'react';

export function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-rose-600 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center text-white">
              <h1 className="text-2xl font-bold tracking-wide">ShopHub</h1>
            </Link>
            <div className="hidden md:flex md:ml-6 md:space-x-8">
              <Link
                to="/"
                className="text-pink-100 hover:text-white transition duration-200 ease-in-out"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-pink-100 hover:text-white transition duration-200 ease-in-out"
              >
                Products
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-rose-700 transition duration-200 ease-in-out"
            >
              <ShoppingCart className="h-6 w-6 text-white" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              className="p-2 rounded-full hover:bg-rose-700 transition duration-200 ease-in-out"
            >
              <User className="h-6 w-6 text-white" />
            </Link>
            <Link
              to="/signin"
              className="bg-pink-500 text-white hover:bg-pink-600 transition duration-200 ease-in-out px-4 py-2 rounded-md"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-pink-700 text-white hover:bg-pink-800 transition duration-200 ease-in-out px-4 py-2 rounded-md"
            >
              Get Started
            </Link>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-white hover:bg-rose-700 transition"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-rose-500 text-pink-100 rounded-lg shadow-md p-4 space-y-4">
            <Link to="/" className="block hover:text-white transition">
              Home
            </Link>
            <Link to="/products" className="block hover:text-white transition">
              Products
            </Link>
            <Link to="/signin" className="block hover:text-white transition">
              Sign In
            </Link>
            <Link to="/signup" className="block hover:text-white transition">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
