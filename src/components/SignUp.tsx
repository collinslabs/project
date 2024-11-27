import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../lib/firebase"; // Import the Firestore instance
import { doc, setDoc } from "firebase/firestore"; // Firestore functions for storing user data
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phonenumber: '',
    buildingname: '',
    streetname: '',
    city: '',
    town: '',
    postalCode: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Get the user ID
      const userId = userCredential.user.uid;

      // Save additional user information in Firestore
      await setDoc(doc(db, "users", userId), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phonenumber: formData.phonenumber,
        buildingname: formData.buildingname,
        streetname: formData.streetname,
        city: formData.city,
        town: formData.town,
        postalCode: formData.postalCode,
        createdAt: new Date()
      });

      setSuccessMessage('Account created successfully!');
      setError('');

      // Redirect to the Sign-In page after 2 seconds
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
      
      console.log('User created and saved to Firestore:', userCredential.user);
    } catch (error) {
      setError('Failed to create account. Please try again.');
      setSuccessMessage('');
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-background">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        <h2 className="text-2xl font-bold text-center col-span-2 mb-6">Create Account</h2>
        {error && <p className="text-red-500 text-center col-span-2 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center col-span-2 mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-pink-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-pink-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-pink-500"
              />
            </div>
            <div>
              <label htmlFor="phonenumber" className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="text"
                id="phonenumber"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-pink-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="buildingname" className="block text-gray-700 mb-2">Building Name</label>
              <input
                type="text"
                id="buildingname"
                name="buildingname"
                value={formData.buildingname}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-pink-500"
              />
            </div>
            <div>
              <label htmlFor="streetname" className="block text-gray-700 mb-2">Street Name</label>
              <input
                type="text"
                id="streetname"
                name="streetname"
                value={formData.streetname}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-pink-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="city" className="block text-gray-700 mb-2">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-pink-500"
              />
            </div>
            <div>
              <label htmlFor="town" className="block text-gray-700 mb-2">Town</label>
              <input
                type="text"
                id="town"
                name="town"
                value={formData.town}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-pink-500"
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-gray-700 mb-2">PostalCode</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-pink-500"
              />
            </div>
            
          </div>
            <div className='mb-4'>
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-pink-500"
              />
            </div>
          
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 col-span-2">Already have an account?{' '}<span onClick={() => navigate('/signin')}
          className="text-pink-600 hover:underline cursor-pointer"
          >
          Sign In</span>
        </p>
      </div>
    </div>
  );
}

