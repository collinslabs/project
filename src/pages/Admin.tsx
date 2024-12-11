import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Loader } from 'lucide-react';

interface Product {
  id?: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  features: string[];
  addedBy: string;
}

export function Admin() {
  const [formData, setFormData] = useState<Product>({
    name: '',
    price: 0,
    image: '',
    description: '',
    category: '',
    features: [],
    addedBy: 'collinsyegon816@gmail.com',
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const fetchedProducts: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products.');
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (!formData.name || !formData.price || !formData.image || !formData.description) {
        throw new Error('All fields are required.');
      }

      if (isNaN(formData.price)) {
        throw new Error('Invalid price value.');
      }

      const productData = {
        ...formData,
        price: parseFloat(formData.price.toString()),
      };

      await addDoc(collection(db, 'products'), productData);

      setProducts((prev) => [...prev, { ...productData }]);
      setFormData({
        name: '',
        price: 0,
        image: '',
        description: '',
        category: '',
        features: [],
        addedBy: 'collinsyegon816@gmail.com',
      });

      setSuccessMessage('Product added successfully!');

      // Redirect to /products with a timeout after successful product addition
      setTimeout(() => {
      }, 2000); // Timeout of 2 seconds before redirecting
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error adding product:', error);
        setError(error.message || 'Failed to add product.');
      } else {
        console.error('Unknown error adding product:', error);
        setError('Failed to add product.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(productId: string) {
    try {
      await deleteDoc(doc(db, 'products', productId));
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      setSuccessMessage('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product.');
    }
  }

  function handleFeatureChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = e.target.value;
    setFormData({ ...formData, features: updatedFeatures });
  }

  function handleAddFeature() {
    setFormData({ ...formData, features: [...formData.features, ''] });
  }

  function handleRemoveFeature(index: number) {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: updatedFeatures });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
      <h1 className="text-2xl font-semibold text-pink-600 mt-5 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add Product Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              >
                <option value="vibrators">Vibrators</option>
                <option value="dildos">Dildos</option>
                <option value="lubricants">Lubricants</option>
                <option value="massage">Massage & Bodycare</option>
                <option value="intimate-wear">Intimate Apparel & Accessories</option>
                <option value="kink">Kink & BDSM</option>
              </select>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(e, index)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddFeature}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Add Feature
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors disabled:bg-pink-400"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin" />
                </span>
              ) : (
                'Add Product'
              )}
            </button>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Product List</h2>
          {loadingProducts ? (
            <p>Loading products...</p>
          ) : (
            <ul>
              {products.map((product) => (
                <li key={product.id} className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-gray-600">{product.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(product.id!)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}