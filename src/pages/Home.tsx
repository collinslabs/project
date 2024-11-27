import { ArrowRight, ShoppingBag, Truck, Shield, Mail, Facebook, Twitter, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


interface FormData {
  name: string;
  email: string;
  message: string;
}
interface Deal {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: string;
}

const deals: Deal[] = [
  {
    id: 1,
    title: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    originalPrice: 349.99,
    discount: 43,
    image: "/headphones.jpg",
    category: "Electronics"
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    price: 149.99,
    originalPrice: 249.99,
    discount: 40,
    image: "/watch.jpg",
    category: "Wearables"
  },
  {
    id: 3,
    title: "4K Ultra HD Smart TV - 55\"",
    price: 499.99,
    originalPrice: 799.99,
    discount: 38,
    image: "/tv.jpg",
    category: "Electronics"
  },
  {
    id: 4,
    title: "Robot Vacuum Cleaner",
    price: 299.99,
    originalPrice: 499.99,
    discount: 40,
    image: "/vacuum.jpg",
    category: "Home"
  }
];

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

  const navigate = useNavigate();

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
                className="inline-flex items-center bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors"
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
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-pink-600" : "bg-gray-400"} transition`}
          ></button>
        ))}
      </div>
    </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-pink-600" />
            <h3 className="mt-4 text-xl font-semibold">Premium Selection</h3>
            <p className="mt-2 text-gray-600">Curated products from top brands</p>
          </div>
          <div className="text-center">
            <Truck className="mx-auto h-12 w-12 text-pink-600" />
            <h3 className="mt-4 text-xl font-semibold">Fast Delivery</h3>
            <p className="mt-2 text-gray-600">Free shipping on orders</p>
          </div>
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-pink-600" />
            <h3 className="mt-4 text-xl font-semibold">Secure Shopping</h3>
            <p className="mt-2 text-gray-600">100% secure payment</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="max-w-7xl mx-auto px-6 py-16">
  <div className="text-center mb-14">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-5">
      Shop By Category
    </h2>
    <p className="text-lg text-gray-500">
      Discover premium products tailored to your needs
    </p>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {CATEGORIES.map((category) => (
      <Link key={category.id} to={`/products?category=${category.id}`}>
      <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h4 className="text-lg font-semibold">{category.name}</h4>
          <p className="text-sm mt-1">{category.description}</p>
        </div>
      </div>
    </Link>

    ))}
  </div>
</section>

       {/* Deals Section */}
      <section id="deals" className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Today's Best Product Deals
          </h2>
          <p className="text-lg text-gray-600">
            Unbeatable prices on top-rated products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="relative">
                <div className="aspect-w-1 aspect-h-1">
                  <div className="w-full h-48 bg-gray-200"></div>
                </div>
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md">
                  -{deal.discount}%
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{deal.category}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {deal.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      ${deal.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${deal.originalPrice}
                    </span>
                  </div>
                  <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button onClick={() => navigate('/products')}
      className="bg-pink-900 hover:bg-pink-800 text-white px-8 py-3 rounded-md transition-colors duration-200 inline-flex items-center">
      View All Products<svg className="w-5 h-5 ml-2"fill="none"stroke="currentColor"viewBox="0 0 24 24"xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2}d="M9 5l7 7-7 7"/></svg>
    </button>
        </div>
      </div>
    </section>

    <section id="delivery" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="mt-4 text-lg text-gray-600">
            We ensure your orders are delivered quickly and securely across the
            country, with your privacy and satisfaction guaranteed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-pink-100 text-pink-600 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 1.343-3 3 0 1.034.527 1.945 1.32 2.473a2.996 2.996 0 00-1.32 2.527c0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.034-.527-1.945-1.32-2.473a2.996 2.996 0 001.32-2.527c0-1.657-1.343-3-3-3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Nationwide Delivery
                </h3>
                <p className="text-gray-600">
                  We deliver to your doorstep anywhere in the country. Our
                  reliable team ensures your order arrives in perfect condition.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-pink-100 text-pink-600 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16v-2a4 4 0 014-4h0a4 4 0 014 4v2m-6 4h8a2 2 0 002-2v-1H5v1a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Guaranteed Privacy
                </h3>
                <p className="text-gray-600">
                  Your orders are shipped with discreet packaging, ensuring
                  confidentiality with no branding or labels.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-pink-100 text-pink-600 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Flexible Hours
                </h3>
                <p className="text-gray-600">
                  Open Monday to Saturday, from 8:30 AM to 7:30 PM. Order
                  anytime, and we’ll process your request promptly.
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://media.istockphoto.com/id/689544510/photo/delivery-of-a-floral-workshop.webp?a=1&b=1&s=612x612&w=0&k=20&c=UehgX9uwcWfFJmgcTM3FRzXHsQucJG5HnLpSu3Hn8Bw="
              alt="Delivery Illustration"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-pink-600 bg-opacity-10 rounded-lg"></div>
          </div>
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
            className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-pink-700 transition-colors"
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
                <a href="#" className="hover:text-pink-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-pink-400 transition-colors">
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
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg flex-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button className="bg-pink-600 px-4 py-2 rounded-r-lg hover:bg-pink-700 transition-colors">
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
