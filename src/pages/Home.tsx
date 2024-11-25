import { ArrowRight, ShoppingBag, Truck, Shield, Mail, Facebook, Twitter, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

interface Review {
  id: number;
  username: string;
  rating: number; // Rating out of 5
  comment: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const CATEGORIES = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661',
    description: 'Latest gadgets and tech accessories',
  },
  {
    id: 'audio',
    name: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    description: 'Premium headphones and speakers',
  },
  {
    id: 'wearables',
    name: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    description: 'Smart watches and fitness trackers',
  },
  {
    id: 'cameras',
    name: 'Cameras',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    description: 'Professional cameras and accessories',
  },
];

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    title: "Welcome to ShopHub",
    description: "Discover our curated collection of premium products",
    link: "/products",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1523381212069-47a79c0ca3eb",
    title: "Latest Fashion Trends",
    description: "Step into style with our new arrivals.",
    link: "/fashion",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    title: "Gadget Deals",
    description: "Upgrade your tech with unbeatable offers.",
    link: "/gadgets",
  },
];

const reviews: Review[] = [
  { id: 1, username: 'Jane Doe', rating: 5, comment: 'Excellent service! Highly recommend.' },
  { id: 2, username: 'John Smith', rating: 4, comment: 'Great experience, but room for improvement.' },
  { id: 3, username: 'Emily Johnson', rating: 3, comment: 'Average experience, expected better.' },
];

const Home: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      const isValid = /\S+@\S+\.\S+/.test(value);
      setFormErrors((prev) => ({ ...prev, email: isValid ? '' : 'Invalid email address' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formErrors.email) {
      alert('Please fix form errors before submitting.');
      return;
    }

    console.log('Form data submitted:', formData);
    setFormSubmitted(true);
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide effect: Change slide every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-purple-50 shadow-lg">
      {/* Hero Section */}
      <section className="relative bg-gray-900 h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover opacity-50"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
              <p className="text-xl mb-8">{slide.description}</p>
              <Link
                to={slide.link}
                className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      ))}
      {/* Navigation Buttons */}
      <button
        onClick={handlePrevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 transition"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 transition"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-blue-600" : "bg-gray-400"} transition`}
          ></button>
        ))}
      </div>
    </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
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
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="mt-4 text-gray-600">Explore our wide range of premium products</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <div className="relative group">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-300 ease-in-out">
                  <div className="text-center text-white">
                    <h4 className="text-lg font-semibold">{category.name}</h4>
                    <p className="mt-2 text-sm">{category.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
          <div className="mt-8 space-y-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              >
                <p className="text-lg font-semibold">{review.username}</p>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      stroke="currentColor"
                    >
                      <path d="M10 15l-3.09 1.628a1 1 0 01-1.453-1.054l.588-3.45-2.55-2.28a1 1 0 01.553-1.709l3.479-.515 1.554-3.15a1 1 0 012.14 0l1.554 3.15 3.479.515a1 1 0 01.553 1.709l-2.55 2.28.588 3.45a1 1 0 01-1.453 1.054L10 15z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-2 text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-gray-600">Have any questions? Get in touch with us!</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg font-semibold">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 p-3 border rounded-md shadow-sm"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg font-semibold">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-2 p-3 border rounded-md shadow-sm ${formErrors.email ? 'border-red-500' : ''}`}
                required
              />
              {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <label htmlFor="message" className="text-lg font-semibold">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="mt-2 p-3 border rounded-md shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            disabled={formSubmitted}
          >
            {formSubmitted ? 'Thank You!' : 'Submit'}
          </button>
        </form>
      </section>

      {/* Footer Section */}
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
};

export default Home;
