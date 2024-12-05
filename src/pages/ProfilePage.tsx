import React, { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase'; // Assuming firebase is properly initialized
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Define types for user and orders
type User = {
  name: string;
  email: string;
  phone: string;
  shippingAddress: string; // Added for address
};

type Order = {
  id: string;
  date: string;
  status: string;
  total: number;
};

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<User | null>(null);
  const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUser(userData);
          setEditFormData(userData); // Initialize edit form data
        } else {
          console.log('No user document found');
        }

        const ordersRef = collection(db, 'orders');
        const querySnapshot = await getDocs(ordersRef);
        const userOrders: Order[] = [];
        
        querySnapshot.forEach((doc) => {
          const orderData = doc.data();
          if (orderData.userId === firebaseUser.uid) {
            userOrders.push({
              id: doc.id,
              date: orderData.date,
              status: orderData.status,
              total: orderData.total,
            });
          }
        });

        setOrders(userOrders);
        setLoading(false);
      } else {
        console.log('No user signed in');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async () => {
    if (user && auth.currentUser) {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userRef, editFormData, { merge: true });
        setUser(editFormData);
        setIsEditing(false);
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile.');
      }
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData!, [name]: value });
  };

  const handleUpdateAddress = async () => {
    if (user && auth.currentUser) {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userRef, { shippingAddress: editFormData?.shippingAddress }, { merge: true });
        setUser({ ...user, shippingAddress: editFormData?.shippingAddress || '' });
        setIsEditingAddress(false);
        alert('Address updated successfully!');
      } catch (error) {
        console.error('Error updating address:', error);
        alert('Error updating address.');
      }
    }
  };

  const handleEditAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditFormData({ ...editFormData!, shippingAddress: value });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Account Profile</h1>

      {/* Profile Information */}
      <section className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-700">Profile Information</h2>
        <div className="mt-4 space-y-2">
          {isEditing ? (
            <>
              <div>
                <label className="block text-gray-600">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData?.name || ''}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData?.email || ''}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={editFormData?.phone || ''}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                  onClick={handleUpdateProfile}
                >
                  Save Changes
                </button>
                <button
                  className="text-gray-600 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span>{user?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span>{user?.phone}</span>
              </div>
              <div className="mt-4">
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Order History */}
      <section className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-700">Order History</h2>
        <div className="mt-4 space-y-4">
          {orders.length === 0 ? (
            <div className="text-gray-600">No orders found</div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="border p-4 rounded-lg bg-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span>{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{order.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold ${order.status === 'Shipped' ? 'text-green-600' : 'text-red-600'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Address Management */}
      <section className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-700">Manage Address</h2>
        <div className="mt-4 space-y-2">
          {isEditingAddress ? (
            <>
              <div>
                <label className="block text-gray-600">Shipping Address:</label>
                <input
                  type="text"
                  value={editFormData?.shippingAddress || ''}
                  onChange={handleEditAddressChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                  onClick={handleUpdateAddress}
                >
                  Save Address
                </button>
                <button
                  className="text-gray-600 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200"
                  onClick={() => setIsEditingAddress(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Address:</span>
                <span>{user?.shippingAddress || 'No address set'}</span>
              </div>
              <button
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                onClick={() => {
                  setIsEditingAddress(true);
                  setEditFormData({ ...editFormData!, shippingAddress: user?.shippingAddress || '' });
                }}
              >
                Edit Address
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;