import { Link } from 'react-router-dom';
import { useCartStore } from '../lib/store';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  features: string[]; 
}

export function ProductCard({ id, name, price, image, description, features = [] }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // Add the item to the cart
    addItem({ id, name, price, image, quantity: 1 });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link to={`/product/${id}`} className="block">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 text-gray-500 text-sm line-clamp-2">{description}</p>

        {/* Display features */}
        {features.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700">Features:</h4>
            <ul className="text-sm text-gray-600 list-disc pl-5">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-m font-bold text-gray-900">KES {price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
      </Link>
    </div>
  );
}
