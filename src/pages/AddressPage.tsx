import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AddressPage() {
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleAddressSubmit = () => {
    // Here you can send the address to your backend or store it in the global state
    navigate('/order-success'); // Navigate to the order success page after address is provided
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h2 className="text-2xl font-bold mb-8">Enter Your Address</h2>
      <div className="bg-gray-50 rounded-lg p-6">
        <label className="block text-gray-700 mb-2">Shipping Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your shipping address"
          className="w-full p-2 border border-gray-300 rounded-lg"
          rows="4"
        ></textarea>
        <button
          onClick={handleAddressSubmit}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6"
        >
          Confirm Address
        </button>
      </div>
    </div>
  );
}
