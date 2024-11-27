import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase'; 
import { doc, getDoc } from 'firebase/firestore';  
import { getAuth } from 'firebase/auth';

interface AccountFormData {
  firstName: string;
  lastName: string;
  email: string;
  phonenumber: string;
  buildingname: string;
  streetname: string;
  city: string;
  town: string;
  postalCode: string;
}

const AccountSettings = () => {
  const [formData, setFormData] = useState<AccountFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phonenumber: '',
    buildingname: '',
    streetname: '',
    city: '',
    town: '',
    postalCode: '',
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
 

  // Fetch account data from Firebase
  useEffect(() => {
    const fetchAccountData = async () => {
      try {

        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userDocRef = doc(db, 'users', user.uid); // Use user.uid as the user ID
          const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setFormData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            phonenumber: data.phonenumber || '',
            buildingname: data.buildingname || '',
            streetname: data.streetname || '',
            city: data.city || '',
            town: data.town || '',
            postalCode: data.postalCode || '',
          });
        } else {
          setError('No user data found.');
        }
      }else {
        setError('User is not authenticated.');
      }

      } catch (err) {
        console.error(err);  // Log the error for debugging
        setError('Failed to load account data. Please try again.');
      
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // You can add functionality to save updated data to Firestore if needed
      // Example: update user document in Firestore
      alert('Account data updated successfully!');
    } catch {
      setError('Failed to load account data. Please try again.');
    }
    
  };

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Navigation Sidebar */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <nav className="space-y-2">
                <a href="#" className="block px-4 py-2 text-pink-600 bg-pink-50 rounded-md">My Profile</a>
                <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Security</a>
                <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Teams</a>
                <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Notifications</a>
                <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Billing</a>
              </nav>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Personal Information</h2>
                      <button
                        type="button"
                        className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Address</h2>
                      <button
                        type="button"
                        className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Building Name</label>
                      <input
                        type="text"
                        name="buildingname"
                        value={formData.buildingname}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Name</label>
                      <input
                        type="text"
                        name="streetname"
                        value={formData.streetname}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Town</label>
                      <input
                        type="text"
                        name="town"
                        value={formData.town}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
