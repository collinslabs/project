import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id?: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  addedBy: string;
}

export function Admin() {
  const [formData, setFormData] = useState<Product>({
    name: '',
    price: 0,
    image: '',
    description: '',
    category: 'electronics',
    addedBy: 'collinsyegon816@gmail.com',
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const navigate = useNavigate();

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
        category: 'electronics',
        addedBy: 'collinsyegon816@gmail.com',
      });

      setSuccessMessage('Product added successfully!');

      // Redirect to /products with a timeout after successful product addition
      setTimeout(() => {
        navigate('/products');
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Add Product Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Fields */}
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              rows={3}
            />
          </div>
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            >
              <option value="electronics">Electronics</option>
              <option value="audio">Audio</option>
              <option value="wearables">Wearables</option>
              <option value="cameras">Cameras</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors disabled:bg-pink-400"
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

      {/* Product List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        {loadingProducts ? (
          <p>Loading products...</p>
        ) : (
          <ul className="space-y-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <li key={product.id} className="flex items-center justify-between border p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src={product.image} alt={product.name} className="h-16 w-16 object-cover rounded" />
                  <div>
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="text-sm text-gray-500">Category: {product.category}</p>
                    <p className="text-sm text-gray-500">Price: KES {product.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(product.id!)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
