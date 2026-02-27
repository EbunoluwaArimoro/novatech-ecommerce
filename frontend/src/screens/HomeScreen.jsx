import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import { FaHeadphones, FaLaptop, FaGamepad, FaHome } from 'react-icons/fa';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery({});

  return (
    <div className="space-y-16">
      {/* 1. Featured Categories Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: 'Audio', icon: FaHeadphones, color: 'bg-indigo-50 text-indigo-600' },
          { name: 'Computers', icon: FaLaptop, color: 'bg-blue-50 text-blue-600' },
          { name: 'Gaming', icon: FaGamepad, color: 'bg-purple-50 text-purple-600' },
          { name: 'Smart Home', icon: FaHome, color: 'bg-teal-50 text-teal-600' }
        ].map((cat, i) => (
          <Link key={i} to={`/shop?category=${cat.name}`} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow group cursor-pointer">
            <div className={`p-4 rounded-full ${cat.color} mb-3 group-hover:scale-110 transition-transform`}>
              <cat.icon className="text-2xl" />
            </div>
            <span className="font-bold text-slate-800">{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* 2. Latest Arrivals Section */}
      <div id="latest-products" className="scroll-mt-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-slate-200 pb-4">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Latest Arrivals</h2>
          <Link to="/shop" className="text-blue-600 font-semibold hover:underline flex items-center mt-2 md:mt-0">
            View All Collection <span className="ml-1 text-xl leading-none">&rarr;</span>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl">{error?.data?.message || error.error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products && products
              .filter(p => p.image && !p.image.includes('1523275335684')) // Hides broken images
              .slice(0, 8)
              .map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        )}
      </div>

      {/* 3. Split-Screen Promo Banner */}
      <div className="bg-blue-600 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center text-white shadow-xl shadow-blue-500/20">
        <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center items-start">
          <h3 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">Upgrade Your Workspace</h3>
          <p className="text-blue-100 text-lg mb-8 max-w-md">Get up to 20% off on premium laptops and accessories this week. Elevate your productivity today.</p>
          <Link to="/shop?category=Computers" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg">
            Shop Computers
          </Link>
        </div>
        <div className="md:w-1/2 w-full h-64 md:h-[450px] relative">
          <img 
            src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80" 
            alt="Workspace" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;