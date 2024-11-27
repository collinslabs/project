import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ProductCard } from '../components/ProductCard';
import { Filter, Search, Loader } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  addedBy: string;
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const productsQuery = query(collection(db, 'products'));

    const unsubscribe = onSnapshot(productsQuery, (querySnapshot) => {
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'all' || product.category === selectedCategory) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (window.innerWidth < 1024) {
      setIsFilterOpen(false); // Close the filter on small screens
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar Button for Small Screens */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden fixed bottom-4 right-4 bg-pink-500 text-white p-4 rounded-full shadow-lg z-50"
          >
            <Filter className="w-6 h-6" />
          </button>

          {/* Filter Sidebar */}
          <div
            className={`fixed lg:relative top-0 right-0 h-full lg:h-auto w-full lg:w-80 bg-white shadow-xl lg:shadow-none p-6 z-50 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}
          >
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition ${selectedCategory === category ? 'bg-pink-100 text-pink-700' : 'hover:bg-gray-100'}`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between">
                    <span>KES{priceRange[0]}</span>
                    <span>{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border rounded-lg bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="w-8 h-8 text-pink-500 animate-spin" />
              </div>
            ) : (
              /* Products Grid */
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
