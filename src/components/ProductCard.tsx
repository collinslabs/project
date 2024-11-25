import { Link } from 'react-router-dom';
import { useCartStore } from '../lib/store';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export function ProductCard({ id, name, price, image, description }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        </Link>
        <p className="mt-1 text-gray-500 text-sm line-clamp-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          <button
            onClick={() => addItem({ id, name, price, image, quantity: 1 })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}