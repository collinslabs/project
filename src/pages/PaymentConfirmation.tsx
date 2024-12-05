import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../lib/store";

export function PaymentConfirmation() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<null | "success" | "failed">(null);
  const [error] = useState<string | null>(null);

  const DELAY_DURATION = 3000; // 3 seconds delay for simulation

  useEffect(() => {
    // Simulate a delay to mimic payment processing
    const delayConfirmation = setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // Simulate random success/failure
      if (isSuccess) {
        setPaymentStatus("success");
        clearCart(); // Clear cart on success
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
    return <div>Loading... Please wait while we process your order.</div>;
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p className="mt-4 text-gray-600">{error}</p>
        <button
          className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          onClick={() => navigate("/checkout")}
        >
          Return to Checkout
        </button>
      </div>
    );
  }

  if (paymentStatus === "failed") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24">
        <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
        <p className="mt-4 text-gray-600">
          Your payment was not successful. Please try again.
        </p>
        <button
          className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          onClick={() => navigate("/checkout")}
        >
          Return to Checkout
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-24">
      <h2 className="text-2xl font-bold text-green-600">
        Payment Successful!
      </h2>
      <p className="mt-4 text-gray-600">
        Your order has been received and is being prepared for packaging and delivery.
      </p>
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
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
            <p className="font-semibold">
              KES {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
        <div className="mt-6 flex justify-end">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
