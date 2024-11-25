import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCartStore } from '../lib/store';
import { Star, Truck, Shield } from 'lucide-react';

const PRODUCTS = {
  '1': {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    description: 'High-quality wireless headphones with noise cancellation.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Premium sound quality',
      'Comfortable fit'
    ]
  },
  // Add more products
};

export function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  
  const product = PRODUCTS[id as keyof typeof PRODUCTS];
  
  if (!product) {
    return <div className="text-center py-24">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center mt-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 text-yellow-400 fill-current"
              />
            ))}
            <span className="ml-2 text-gray-600">(4.8/5)</span>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">
            ${product.price}
          </p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Key Features</h3>
            <ul className="mt-2 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-2 w-2 bg-blue-600 rounded-full mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <label htmlFor="quantity" className="mr-4">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-lg px-4 py-2"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                  });
                }
              }}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center text-gray-600">
              <Truck className="h-5 w-5 mr-2" />
              Free shipping on orders over $50
            </div>
            <div className="flex items-center text-gray-600">
              <Shield className="h-5 w-5 mr-2" />
              1-year warranty included
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}