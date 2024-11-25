import { ArrowRight, ShoppingBag, Truck, Shield, Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
interface Review {
  id: number;
  username: string;
  rating: number; // Rating out of 5
  comment: string;
}
const CATEGORIES = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661',
    description: 'Latest gadgets and tech accessories'
  },
  {
    id: 'audio',
    name: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    description: 'Premium headphones and speakers'
  },
  {
    id: 'wearables',
    name: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    description: 'Smart watches and fitness trackers'
  },
  {
    id: 'cameras',
    name: 'Cameras',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    description: 'Professional cameras and accessories'
  }
];const reviews: Review[] = [
  {
    id: 1,
    username: 'Jane Doe',
    rating: 5,
    comment: 'Excellent service! Highly recommend.',
  },
  {
    id: 2,
    username: 'John Smith',
    rating: 4,
    comment: 'Great experience, but room for improvement.',
  },
  {
    id: 3,
    username: 'Emily Johnson',
    rating: 3,
    comment: 'Average experience, expected better.',
  },
];

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
          alt="Hero"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to ShopHub</h1>
            <p className="text-xl mb-8">Discover our curated collection of premium products</p>
            <Link
              to="/products"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-blue-600" />
            <h3 className="mt-4 text-xl font-semibold">Premium Selection</h3>
            <p className="mt-2 text-gray-600">Curated products from top brands</p>
          </div>
          <div className="text-center">
            <Truck className="mx-auto h-12 w-12 text-blue-600" />
            <h3 className="mt-4 text-xl font-semibold">Fast Delivery</h3>
            <p className="mt-2 text-gray-600">Free shipping on orders over $50</p>
          </div>
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-blue-600" />
            <h3 className="mt-4 text-xl font-semibold">Secure Shopping</h3>
            <p className="mt-2 text-gray-600">100% secure payment</p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="mt-4 text-gray-600">Explore our wide range of premium products</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 pb-4 last:border-none"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{review.username}</h3>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 .5l2.946 5.455 6.564.955-4.755 4.635 1.123 6.545L10 15z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About ShopHub</h3>
              <p className="text-gray-400">Your premier destination for premium electronics, audio equipment, and cutting-edge technology.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/products" className="text-gray-400 hover:text-white transition-colors">Shop</Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Info</Link>
                </li>
                <li>
                  <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns</Link>
                </li>
                <li>
                  <Link to="/track-order" className="text-gray-400 hover:text-white transition-colors">Track Order</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                  <Mail className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}