import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import { FaStore, FaTimes } from 'react-icons/fa';

const ShopScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  
  // Extract parameters from the URL
  const keyword = sp.get('search') || '';
  const category = sp.get('category') || '';

  // Pass them to the Redux query! This is what fixes the bug.
  const { data: products, isLoading, error } = useGetProductsQuery({ keyword, category });

  const categories = ['Audio', 'Wearables', 'Gaming', 'Computers', 'Smart Home'];

  // Clear filters handler
  const clearFilters = () => {
    navigate('/shop');
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4">
      {/* Page Header */}
      <div className="bg-slate-900 rounded-3xl p-10 mb-10 shadow-xl flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold flex items-center mb-2">
            <FaStore className="mr-4 text-blue-500" />
            The Tech Vault
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            {keyword ? `Search results for "${keyword}"` : category ? `Browsing ${category}` : 'Browse our complete collection of premium gadgets.'}
          </p>
        </div>
        {/* Decorative background circle */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Filters */}
        <div className="md:w-1/4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-28">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">Filters</h3>
              {(keyword || category) && (
                <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-700 flex items-center font-bold">
                  <FaTimes className="mr-1" /> Clear
                </button>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Categories</h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/shop" 
                    className={`block px-3 py-2 rounded-lg transition-colors font-medium ${!category ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    All Products
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link 
                      to={`/shop?category=${cat}`} 
                      className={`block px-3 py-2 rounded-lg transition-colors font-medium ${category === cat ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:w-3/4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl font-bold text-center">
              {error?.data?.message || error.error}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 text-slate-500 px-6 py-12 rounded-3xl font-bold text-center flex flex-col items-center">
              <FaStore className="text-4xl mb-4 text-slate-300" />
              <p className="text-xl">No products found matching your criteria.</p>
              <button onClick={clearFilters} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">View All Products</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;