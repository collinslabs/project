import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../lib/store';
import { useState } from 'react';

export function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for the dropdown
  const [isFadingOut, setIsFadingOut] = useState(false); // State for fade-out animation

  const handleLinkClick = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsFadingOut(false);
    }, 300); // Matches transition duration
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center text-pink-600">
              <div className="flex items-center">
                <ShoppingCart className="h-6 w-6 mr-1" />
                <h1 className="text-xl font-semibold">Shopcart</h1>
              </div>
            </Link>
            <div className="hidden md:flex md:ml-6 md:space-x-8">
              <a href="#categories" className="text-gray-700 hover:text-pink-600 transition">
                Categories
              </a>
              <a href="#deals" className="text-gray-700 hover:text-pink-600 transition">
                Deals
              </a>
              <a href="#whats-new" className="text-gray-700 hover:text-pink-600 transition">
                What's New
              </a>
              <a href="#delivery" className="text-gray-700 hover:text-pink-600 transition">
                Delivery
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Product"
                  className="w-64 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-700 hover:text-pink-600 transition flex items-center"
              >
                <User className="h-5 w-5 mr-1" />
                <span>Account</span>
              </button>

              {isDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 transition-all transform ${
                    isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                  style={{ transitionDuration: '300ms' }}
                >
                  <ul>
                    <li className="transition-transform duration-300 transform hover:translate-y-1">
                      <Link
                        to="/signin"
                        className="block px-4 py-2 text-gray-700 hover:bg-pink-600 hover:text-white transition"
                        onClick={handleLinkClick}
                      >
                        Login
                      </Link>
                    </li>
                    <li className="transition-transform duration-300 transform hover:translate-y-1">
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-gray-700 hover:bg-pink-600 hover:text-white transition"
                        onClick={handleLinkClick}
                      >
                        Register
                      </Link>
                    </li>
                    <li className="transition-transform duration-300 transform hover:translate-y-1">
                      <Link
                        to="/account/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-pink-600 hover:text-white transition"
                        onClick={handleLinkClick}
                      >
                        Account Settings
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <Link to="/cart" className="text-gray-700 hover:text-pink-600 transition flex items-center">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <span className="ml-1">Cart</span>
            </Link>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-pink-600 transition"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div
            className={`md:hidden bg-white border-t py-4 space-y-4 px-4 transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
          >
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search Product"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <a
              href="#categories"
              className="block text-gray-700 hover:text-pink-600 transition"
              onClick={handleLinkClick}
            >
              Categories
            </a>
            <a
              href="#deals"
              className="block text-gray-700 hover:text-pink-600 transition"
              onClick={handleLinkClick}
            >
              Deals
            </a>
            <a
              href="#whats-new"
              className="block text-gray-700 hover:text-pink-600 transition"
              onClick={handleLinkClick}
            >
              What's New
            </a>
            <a
              href="#delivery"
              className="block text-gray-700 hover:text-pink-600 transition"
              onClick={handleLinkClick}
            >
              Delivery
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
