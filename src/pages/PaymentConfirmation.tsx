import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../lib/store";

export function PaymentConfirmation() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore(); // Added clearCart to clear items after a successful purchase
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<null | "success" | "failed">(null);
  const [error, setError] = useState<string | null>(null);

  const POLLING_INTERVAL = 3000; // 3 seconds
  const TIMEOUT_DURATION = 60000; // 60 seconds

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let pollingId: NodeJS.Timeout;

    const fetchTransactionAndPaymentStatus = async () => {
      try {
        // Fetch transaction ID from the backend
        const response = await fetch(`/api/transaction`);
        if (!response.ok) {
          throw new Error(`Error fetching transaction ID: ${response.statusText}`);
        }
    
        const contentType = response.headers.get("Content-Type");
        if (!contentType?.includes("application/json")) {
          throw new Error("Expected JSON response, but received non-JSON data.");
        }
    
        const { transactionId } = await response.json();
    
        if (!transactionId) {
          throw new Error("Transaction ID not found.");
        }
    
        // Use the transaction ID to fetch the payment status
        const statusResponse = await fetch(`/api/transaction?transactionId=${transactionId}`);
        if (!statusResponse.ok) {
          throw new Error(`Error fetching payment status: ${statusResponse.statusText}`);
        }
    
        const statusContentType = statusResponse.headers.get("Content-Type");
        if (!statusContentType?.includes("application/json")) {
          throw new Error("Expected JSON response for payment status, but received non-JSON data.");
        }
    
        const data = await statusResponse.json();
    
        if (data.status === "success") {
          setPaymentStatus("success");
          clearCart(); // Clear cart on successful payment
          clearTimeout(timeoutId);
          clearInterval(pollingId);
        } else {
          setPaymentStatus("failed");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to validate payment. Please try again later.");
        clearTimeout(timeoutId);
        clearInterval(pollingId);
      } finally {
        setLoading(false);
      }
    };
    

    const startPolling = () => {
      pollingId = setInterval(() => {
        fetchTransactionAndPaymentStatus();
      }, POLLING_INTERVAL);

      timeoutId = setTimeout(() => {
        clearInterval(pollingId);
        setLoading(false);
        setError("Transaction processing took too long. Please try again later.");
      }, TIMEOUT_DURATION);
    };

    startPolling();

    return () => {
      clearInterval(pollingId);
      clearTimeout(timeoutId);
    };
  }, [clearCart]);

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner if needed
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
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
