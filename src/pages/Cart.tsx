import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../lib/store';
import { Trash2, Plus, Minus } from 'lucide-react';

export function Cart() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCartStore();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    // Simulate a successful checkout process (e.g., API call)
    clearCart();

    // After successful checkout, navigate to the order success page
    navigate('/order-success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h2 className="text-2xl font-bold mb-8">Shopping Cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 border-b py-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{total > 50 ? 'Free' : '$4.99'}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${(total > 50 ? total : total + 4.99).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6 block text-center"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
