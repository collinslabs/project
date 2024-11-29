import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../lib/store';
import { useAuth } from '../lib/useAuth'; 

export function Cart() {
  const { items, total, removeItem, updateQuantity } = useCartStore();
  const { user } = useAuth(); 
  const navigate = useNavigate();

  if (!user) { 
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">Please Sign In</h2>
        <Link
          to="/signin" 
          className="inline-block bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">Your Cart is Empty</h2>
        <Link
          to="/products"
          className="inline-block bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-pink-600 mb-8">Review Your Order</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div key={item.id} className="bg-white shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105">
              <div className="flex items-center space-x-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-md font-medium mb-2 text-pink-500">{item.name}</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-pink-300 px-2 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="py-1 px-2 text-pink-600 hover:bg-pink-200 rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="py-1 px-2 text-pink-600 hover:bg-pink-200 rounded"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-pink-500 hover:text-pink-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-md font-semibold text-pink-600">KES {item.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-pink-600 mb-4">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Product Total ({items.length})</span>
                <span>KES {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping To</span>
                <span>Kenya</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping Costs</span>
                <span>KES 0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total without VAT</span>
                <span>KES {(total * 0.8).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Including 16% VAT</span>
                <span>KES {(total * 0.2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-4 border-t border-pink-300">
                <span>Order Total</span>
                <span>KES {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  placeholder="Select Voucher"
                  className="flex-1 rounded-lg border-gray-300 p-2"
                />
                <button
                  className="bg-pink-400 text-white hover:bg-pink-600 rounded-lg py-2 px-4"
                >
                  Apply
                </button>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-pink-600 text-white hover:bg-pink-700 rounded-lg py-2 px-4"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-center text-gray-500">
                Payments are processed securely
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;