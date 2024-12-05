import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../lib/store";

export function PaymentConfirmation() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<null | "success" | "failed">(null);
  const [error] = useState<string | null>(null);

  const DELAY_DURATION = 180000;

  useEffect(() => {
    const delayConfirmation = setTimeout(() => {
      const isSuccess = Math.random() > 0.3;
      if (isSuccess) {
        setPaymentStatus("success");
        clearCart();
      } else {
        setPaymentStatus("failed");
      }
      setLoading(false);
    }, DELAY_DURATION);

    return () => {
      clearTimeout(delayConfirmation);
    };
  }, [clearCart]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-500 border-opacity-50 mb-6"></div>
          <p className="text-pink-600 font-semibold">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 bg-pink-50 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-pink-600">Oops! Something went wrong</h2>
        <p className="mt-4 text-gray-600">{error}</p>
        <button
          className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 shadow-lg"
          onClick={() => navigate("/checkout")}
        >
          Return to Checkout
        </button>
      </div>
    );
  }

  if (paymentStatus === "failed") {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 bg-pink-50 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-red-500">Payment Failed</h2>
        <p className="mt-4 text-gray-600">
          Unfortunately, your payment was not successful. Please try again.
        </p>
        <button
          className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 shadow-lg"
          onClick={() => navigate("/checkout")}
        >
          Return to Checkout
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 bg-pink-50 rounded-lg shadow-lg">
  <h2 className="text-3xl font-bold text-pink-600 text-center mb-8">
    Your Order is Being Processed
  </h2>
  <p className="text-center text-gray-600 mb-6">
    Please check the STK push on your phone to complete the payment.
  </p>
  <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">
    Once your payment is successful, you will receive an SMS to track your order.
  </h3>
  <div className="mb-8">
    {items.map((item) => (
      <div
        key={item.id}
        className="flex items-center space-x-4 border-b py-4 last:border-0"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg border border-pink-100 shadow-sm"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
          <p className="text-pink-500">
            KES {item.price} × {item.quantity}
          </p>
        </div>
        <p className="font-semibold text-gray-700">
          KES {(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    ))}
  </div>
  <div className="flex justify-center">
    <button
      className="px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 shadow-lg transition"
      onClick={() => navigate("/")}
    >
      Return to Home
    </button>
  </div>
</div>

  );
}
