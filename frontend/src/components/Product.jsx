import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const Product = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden group flex flex-col h-full relative">
      
      {product.countInStock === 0 && (
        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
          Out of Stock
        </div>
      )}

      {/* STRICT DIMENSIONS: aspect-square, p-6, object-contain */}
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-square w-full overflow-hidden bg-white flex items-center justify-center cursor-pointer border-b border-slate-50 p-6">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider">
          {product.brand}
        </p>
        
        <Link to={`/product/${product._id}`}>
          <h3 className="font-bold text-lg text-slate-800 leading-tight mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-4 mt-auto">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-slate-800 font-bold text-sm">{product.rating}</span>
          <span className="text-slate-400 text-xs ml-2">({product.numReviews} reviews)</span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
          <span className="text-2xl font-extrabold text-slate-900">
            ${product.price}
          </span>
          <button 
            disabled={product.countInStock === 0}
            className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
              product.countInStock === 0 
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/30'
            }`}
          >
            <FaShoppingCart className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;