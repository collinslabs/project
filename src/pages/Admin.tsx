import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Trash2, Loader } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  features: string[];
}

export function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: 'electronics',
    features: ['']
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        features: formData.features.filter(feature => feature.trim() !== '')
      };

      await addDoc(collection(db, 'products'), productData);
      
      setFormData({
        name: '',
        price: '',
        image: '',
        description: '',
        category: 'electronics',
        features: ['']
      });

      await fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(productId: string) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        await fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }

  function handleFeatureChange(index: number, value: string) {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    
    // Add new empty feature field if last field is filled
    if (index === newFeatures.length - 1 && value.trim() !== '') {
      newFeatures.push('');
    }
    
    setFormData({ ...formData, features: newFeatures });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Add Product Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="electronics">Electronics</option>
              <option value="audio">Audio</option>
              <option value="wearables">Wearables</option>
              <option value="cameras">Cameras</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features
            </label>
            {formData.features.map((feature, index) => (
              <input
                key={index}
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-2"
              />
            ))}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader className="animate-spin h-5 w-5 mr-2" />
                Adding Product...
              </span>
            ) : (
              'Add Product'
            )}
          </button>
        </form>
      </div>
      
      {/* Products List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Current Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 relative group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <button
                onClick={() => handleDelete(product.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}