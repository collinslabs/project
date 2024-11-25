import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export function OrderSuccess() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-8">
          Your order has been successfully placed. We'll send you an email with your order details shortly.
        </p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
