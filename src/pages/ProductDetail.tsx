import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useCartStore } from '../lib/store';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  features: string[];
  rating?: number;
  reviews?: number;
}

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const productData = docSnap.data();
        setProduct({
          id: docSnap.id,
          name: productData.name,
          price: productData.price,
          image: productData.image,
          description: productData.description,
          features: productData.features || [],
          rating: productData.rating || 4.5,
          reviews: productData.reviews || 128,
        });
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    );
  }

  const handleAddToCart = (product: Product) => {
    // Add the item to the cart with a default quantity of 1
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
  };

  const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg
      className={`w-4 h-4 ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  const HeartIcon = () => (
    <svg
      className={`w-6 h-6 ${isWishlisted ? 'text-pink-500 fill-pink-500' : 'text-gray-400'}`}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  const TruckIcon = () => (
    <svg className="w-5 h-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className="max-w-7xl mx-auto p-4  md:p-8">
      <div className="grid md:grid-cols-2 mt-14 gap-8 md:gap-12">
        {/* Image Section */}
        <div className="overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[600px] object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < Math.floor(product.rating || 0)} />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.reviews} reviews
              </span>
            </div>
          </div>

          <div className="text-2xl font-light">
            KES {product.price.toLocaleString()}
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Free Shipping Alert */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 flex items-center">
            <TruckIcon />
            <p className="ml-2 text-gray-700">
              Free Express Shipping on Orders Above KES 5,000
            </p>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <h3 className="font-medium">Select Size</h3>
            <div className="flex gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-full border transition-colors
                    ${selectedSize === size
                      ? 'border-pink-500 bg-pink-50 text-pink-500'
                      : 'border-gray-200 hover:border-pink-200'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
            onClick={() => handleAddToCart(product)}
            className="flex-1 bg-pink-500 text-white px-8 py-4 rounded-full hover:bg-pink-600 transition-colors">
              Add to Cart
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-4 rounded-full border transition-colors
                ${isWishlisted ? 'bg-pink-50 border-pink-200' : 'border-gray-200'}`}
            >
              <HeartIcon />
            </button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-pink-500">↺</span>
              7-Day Returns
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-pink-500">🛡️</span>
              Secure Payment
            </div>
          </div>

          {/* Features */}
          <div className="pt-6 space-y-2">
            <h3 className="font-medium mb-4">Highlights</h3>
            <div className="flex flex-wrap gap-2">
              {product.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;