import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { FaStar, FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Fetching Product Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center p-8 bg-red-50 rounded-3xl border border-red-100 shadow-sm">
        <h2 className="text-2xl font-bold text-red-700 mb-2">Oops!</h2>
        <p className="text-red-600 mb-6">{error?.data?.message || 'Something went wrong while loading the product.'}</p>
        <Link to="/" className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-all">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="py-4 max-w-7xl mx-auto px-4">
      <Link to="/" className="inline-flex items-center text-slate-600 hover:text-blue-600 mb-6 font-medium transition-colors group">
        <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" /> 
        Back to Products
      </Link>

      {/* 50/50 Split Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
        
        {/* LEFT SIDE: Strict 4:3 Image Container */}
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50">
          <img 
  src={product.image} 
  alt={product.name} 
  className="absolute inset-0 w-full h-full object-contain p-8 mix-blend-multiply" 
/>
        </div>

        {/* RIGHT SIDE: Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-2">
             <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">{product.brand}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 leading-tight">{product.name}</h1>
          
          <div className="flex items-center mb-6 pb-6 border-b border-slate-100">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="font-bold text-slate-800 mr-2">{product.rating}</span>
            <span className="text-slate-400 text-sm">({product.numReviews} reviews)</span>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8 text-lg">
            {product.description}
          </p>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="flex justify-between mb-4 border-b border-slate-200 pb-4">
              <span className="text-slate-500 font-medium">Price:</span>
              <span className="text-2xl font-bold text-slate-900">${product.price}</span>
            </div>
            
            <div className="flex justify-between mb-6">
              <span className="text-slate-500 font-medium">Status:</span>
              <span className={`font-bold flex items-center ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.countInStock > 0 ? <><FaCheck className="mr-2 text-sm"/> In Stock</> : <><FaTimes className="mr-2 text-sm"/> Out of Stock</>}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between mb-8 items-center bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-medium ml-2">Quantity:</span>
                <select 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer px-4"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
            )}

            <button 
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
                product.countInStock > 0 
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1 hover:shadow-blue-500/30 active:translate-y-0 cursor-pointer' 
                : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
              }`}
            >
              {product.countInStock > 0 ? 'Add to Cart' : 'Currently Unavailable'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;