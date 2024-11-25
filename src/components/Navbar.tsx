import { ShoppingCart, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../lib/store';

export function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  
  return (
    <nav className="bg-gray-800 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center text-white">
              <h1 className="text-2xl font-bold">ShopHub</h1>
            </Link>
            <div className="hidden md:flex md:ml-6 md:space-x-8">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition duration-200 ease-in-out"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-300 hover:text-white transition duration-200 ease-in-out"
              >
                Products
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-700 transition duration-200 ease-in-out"
            >
              <ShoppingCart className="h-6 w-6 text-white" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              className="p-2 rounded-full hover:bg-gray-700 transition duration-200 ease-in-out"
            >
              <User className="h-6 w-6 text-white" />
            </Link>
            <Link
             to="/signin"
             className="bg-blue-600 text-white hover:bg-blue-700 transition duration-200 ease-in-out px-4 py-2 rounded-md"
             >
             Sign In
            </Link>
            <Link
            to="/signup"
            className="bg-green-600 text-white hover:bg-green-700 transition duration-200 ease-in-out px-4 py-2 rounded-md"
            >
             Get Started
             </Link>
            <div className="md:hidden">
              <Menu className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}