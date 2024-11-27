import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../lib/store';
import { useAuth } from '../lib/useAuth'; // Assuming useAuth is a custom hook that gives authentication info

export function Cart() {
  const { items, total, removeItem, updateQuantity } = useCartStore();
  const { user } = useAuth(); // This hook returns the authenticated user (you can modify it based on your authentication setup)
  const navigate = useNavigate();

  if (!user) { // Check if the user is not authenticated
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Please sign in to proceed</h2>
        <Link
          to="/signin" // Redirect to login page
          className="inline-block bg-pink text-white px-6 py-3 rounded-none hover:bg-pink-900 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          to="/products"
          className="inline-block bg-pink text-white px-6 py-3 rounded-none hover:bg-pink-900 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-medium mb-8">REVIEW ORDER</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div key={item.id} className="bg-gray-50 p-6 mb-4">
              <div className="flex items-center space-x-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-2">{item.name}</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border px-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="py-1 px-2"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="py-1 px-2"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">KES {item.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">SUMMARY</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Product Total ({items.length})</span>
                <span>KES{total.toFixed(2)}</span>
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
                <span>KES{(total * 0.8).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Including 16% VAT</span>
                <span>KES{(total * 0.2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium pt-4 border-t">
                <span>Order Total</span>
                <span>KES{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  placeholder="SELECT VOUCHER"
                  className="flex-1 rounded-none border-gray-300 p-2"
                />
                <button
                  className="bg-[#E8FF3C] text-black hover:bg-[#d3ea35] rounded-none py-2 px-4"
                >
                  APPLY
                </button>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-black text-white hover:bg-gray-900 rounded-none py-2 px-4"
              >
                PROCEED TO CHECKOUT
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
