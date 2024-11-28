import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCartStore } from '../lib/store';

export function PaymentConfirmation() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [searchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paymentStatus = searchParams.get('status');

    if (paymentStatus === 'success') {
      setIsSuccess(true);
      clearCart();
    } else {
      setIsSuccess(false);
    }

    setLoading(false);
  }, [searchParams, clearCart]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Verifying payment...</p>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
        <p className="mt-4 text-gray-600">
          Your payment was not successful. Please try again.
        </p>
        <button
          className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          onClick={() => navigate('/checkout')}
        >
          Return to Checkout
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-24">
      <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
      <p className="mt-4 text-gray-600">
        Thank you for your purchase! Your items are being scheduled for packaging and delivery.
        This process will take approximately 3 working days.
      </p>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Your Order</h3>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 border-b py-4 last:border-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">
                KES {item.price} × {item.quantity}
              </p>
            </div>
            <p className="font-semibold">KES {(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

        <div className="mt-6 flex justify-end">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => navigate('/')}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
