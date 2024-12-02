import { ArrowRight, ShoppingBag, Truck, Shield, Mail, Facebook, Twitter, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs  } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useCartStore } from '../lib/store';



interface FormData {
  name: string;
  email: string;
  message: string;
}
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  
  addedBy: string;
}



const CATEGORIES = [
  {
    id: 'vibrators',
    name: 'Vibrators',
    image: 'https://images.unsplash.com/photo-1616783335090-ec6e7ac63975?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHZpYnJhdG9yc3xlbnwwfHwwfHx8MA%3D%3D',
    description: 'Discover premium vibrators designed to enhance pleasure and comfort, made with high-quality materials for your satisfaction.',
  },
  {
    id: 'lubricants',
    name: 'Lubricants',
    image: 'https://images.unsplash.com/photo-1605668675507-b4d7082fb595?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHVicmljYW50fGVufDB8fDB8fHww',
    description: 'Experience a smooth, comfortable sensation with our top-rated lubricants, designed for ultimate pleasure and ease.',
  },
  {
    id: 'massage',
    name: 'Massage & Bodycare',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hc3NhZ2UlMjBhbmQlMjBib2R5Y2FyZXxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Indulge in relaxation with our luxurious massage products, carefully crafted for your wellness and intimate moments.',
  },
  {
    id: 'intimate-wear',
    name: 'Intimate Apparel & Accessories',
    image: 'https://plus.unsplash.com/premium_photo-1661456408281-312fd0059de9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW50aW1hdGUlMjB3ZWFyfGVufDB8fDB8fHww',
    description: 'Explore a selection of intimate apparel and accessories, designed for comfort, confidence, and self-expression.',
  },
  {
    id: 'kink',
    name: 'Kink & BDSM',
    image: 'https://images.unsplash.com/photo-1581794236300-acd130bf0035?w=294&dpr=1&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8UTJQbVdYSnhVckl8fGVufDB8fHx8fA%3D%3D',
    description: 'Explore tasteful and safe kink and BDSM products, designed to enhance your intimate experiences with respect and care.',
  },
];


const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1593526659358-5f1489f8efa2?w=294&dpr=1&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8OTkwMTUyNXx8ZW58MHx8fHx8",
    title: "Welcome to ShopHub",
    description: "Explore our exclusive collection of thoughtfully curated,premium products designed to enhance your pleasure and well-being. Each item is carefully selected for its quality, safety, and sophistication.",
    link: "/products",
    additionalText: "Experience a discreet and personalized shopping journey, with secure, private transactions and fast, reliable delivery. Your satisfaction and privacy are our top priorities.",
    callToAction: "Browse Our Curated Selection Now"
  },
  
  {
    id: 2,
    image: "https://plus.unsplash.com/premium_photo-1700028099087-2330d98e860a?w=294&dpr=1&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8eG5yVkNZQ2xpb2N8fGVufDB8fHx8fA%3D%3D",
    title: "Discover Your Perfect Match",
    description: "Browse our latest arrivals, featuring a premium selection of products designed for your ultimate comfort and pleasure. Each item is chosen with care to ensure safety, satisfaction, and a personalized experience.",
    link: "/products",
    additionalText: "Whether you're new to our collection or a returning customer, we guarantee discreet packaging and fast, secure shipping. Your privacy and satisfaction are our top priorities.",
    callToAction: "Explore Our Latest Selection Now"
  },
  
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1579006318110-42d7992b6635?w=294&dpr=1&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MTIyMTQ3OTV8fGVufDB8fHx8fA%3D%3D",
    title: "Intimate Wellness & Pleasure",
    description: "Explore our thoughtfully curated selection of intimate wellness products designed to enhance your pleasure and well-being. Enjoy premium, body-safe materials, and products that prioritize comfort and satisfaction.",
    link: "/products",
    additionalText: "With a focus on privacy, each order is discreetly packaged and shipped with care. Experience shopping with confidence, knowing your personal information and purchases are always secure.",
    callToAction: "Discover Your Pleasure Now"
  }
  
];


const Home: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: '' });

  const [products, setProducts] = useState<Product[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    // Fetch products from Firestore
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products")); // 'products' is your Firestore collection name
        const productList: Product[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          productList.push({
            id: doc.id,
            name: data.name,
            price: data.price,
            image: data.image,
            description: data.description,
            category: data.category,
            addedBy: data.addedBy,
          });
        });
        setProducts(productList); // Set the products data into the state
      } catch (error) {
        console.error("Error fetching products from Firebase:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    // Add the item to the cart with a default quantity of 1
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
  };

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
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 h-[600px] overflow-hidden">
  {slides.map((slide, index) => (
    <div
      key={slide.id}
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
    >
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-cover opacity-60"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <div className="text-center text-white p-5 md:p-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{slide.title}</h1>
          <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">{slide.description}</p>
          <Link
            to={slide.link}
            className="inline-flex items-center bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-pink-700 transition-colors"
          >
            {slide.callToAction}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="mt-4 text-sm">{slide.additionalText}</p>
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
        <div className="text-center bg-pink-50 p-6 rounded-lg shadow-lg">
           <ShoppingBag className="mx-auto h-12 w-12 text-pink-600" />
           <h3 className="mt-4 text-xl font-semibold text-pink-700">
              Premium Collection of Intimate Products
          </h3>
          <p className="mt-2 text-md text-gray-700">
           Discover a curated selection of high-quality, body-safe products from top-rated brands, designed to elevate your experience. 
           Whether you're looking for personal pleasure, enhanced intimacy, or self-care, we offer a wide range of products to suit your needs.
          </p>
          <p className="mt-4 text-gray-500">
          Every product is carefully vetted for safety, durability, and satisfaction. Shop with confidence knowing you're investing in your well-being.
          </p>
  
         </div>

          <div className="text-center bg-pink-50 p-6 rounded-lg shadow-lg">
             <Truck className="mx-auto h-12 w-12 text-pink-600" />
                 <h3 className="mt-4 text-xl font-semibold text-pink-700">
                   Fast & Discreet Delivery
                 </h3>
               <p className="mt-2 text-md text-gray-700">
              We understand the importance of privacy and convenience. Enjoy free, fast, and discreet shipping on all orders, so you can receive your products with confidence and peace of mind.
             </p>
             <p className="mt-4 text-gray-500">
             Our shipping process is swift and confidential, ensuring your order arrives quickly and without a hassle. Shop with complete discretion, and let us handle the rest.
             </p>
            </div>

            <div className="text-center bg-pink-50 p-6 rounded-lg shadow-lg">
                <Shield className="mx-auto h-12 w-12 text-pink-600" />
                <h3 className="mt-4 text-xl font-semibold text-pink-700">
                   Secure & Private Shopping
                 </h3>
                <p className="mt-2 text-md text-gray-700">
                   Shop with complete confidence knowing your personal information and payment details are protected. Our secure payment gateway ensures your privacy at every step of your purchase.
                 </p>
                <p className="mt-4 text-gray-500">
                We use industry-leading encryption technology to safeguard your payment information. Your transaction will be discreet, secure, and handled with the utmost care, so you can focus on enjoying your shopping experience.
            </p>
           </div>

        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-14">
         <h2 className="text-2xl font-extrabold text-gray-900 mb-5">
                 Explore Our Premium Collection
           </h2>
          <p className="text-md text-gray-500">
         Discover high-quality, thoughtfully designed products that prioritize your comfort, privacy, and well-being. Shop with confidence and experience a more fulfilling lifestyle.
       </p>
     </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
            Discover Today's Best Offers on Premium Products
              </h2>
            <p className="text-lg text-gray-600">
            Enjoy unbeatable prices on top-quality products that prioritize your comfort, pleasure, and well-being. Shop with confidence and explore our carefully curated collection.
             </p>
          </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Directly slicing the products array in the map */}
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="relative">
                <div className="aspect-w-1 aspect-h-1">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      KES {product.price}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)} // Call handleAddToCart with the current product
                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/products")}
            className="bg-pink-900 hover:bg-pink-800 text-white px-8 py-3 rounded-md transition-colors duration-200 inline-flex items-center"
          >
            View All Products
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <section id="delivery" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
        <p className="mt-4 text-lg text-gray-600">
        Your privacy and satisfaction are our top priorities. We ensure discreet, fast, and secure delivery of your orders to any location, with no details shared beyond what’s necessary. Shop with confidence, knowing that we uphold the highest standards of care and professionalism in handling your personal information and products.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About ShopHub</h3>
              <p className="text-gray-400">Your trusted destination for high-quality, thoughtfully designed products that prioritize your comfort, pleasure, and personal well-being. Explore a curated selection of premium items, all crafted with care and discretion to enhance your intimate experiences.</p>
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
            {/* <div>
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
            </div> */}
            {/* <div>
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
            </div> */}
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
          <div onClick={() => navigate('/admin')}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
