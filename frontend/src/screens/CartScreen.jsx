import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    // This sends users to login, and then to shipping once authenticated
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-blue-50 border border-blue-100 p-10 rounded-3xl text-center">
          <p className="text-blue-800 text-lg mb-6">Your cart is currently empty.</p>
          <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
                <div className="w-24 h-24 bg-slate-50 rounded-xl p-2 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <Link to={`/product/${item._id}`} className="font-bold text-slate-800 hover:text-blue-600 text-lg line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="text-blue-600 font-bold mt-1">${item.price}</p>
                </div>

                <div className="flex items-center gap-4">
                  <select 
                    value={item.qty} 
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    className="p-2 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none bg-slate-50"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>

                  <button 
                    onClick={() => removeFromCartHandler(item._id)}
                    style={{ cursor: 'pointer' }}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-all"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl sticky top-4">
              <h2 className="text-xl font-bold mb-6 border-b border-slate-700 pb-4">Order Summary</h2>
              
              <div className="flex justify-between mb-4">
                <span className="text-slate-400">Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                <span className="font-bold">${cart.itemsPrice}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-slate-400">Shipping</span>
                <span className="font-bold text-green-400">{cart.shippingPrice === "0.00" ? 'FREE' : `$${cart.shippingPrice}`}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-slate-400">Tax</span>
                <span className="font-bold">${cart.taxPrice}</span>
              </div>

              <div className="flex justify-between text-2xl font-extrabold border-t border-slate-700 pt-6 mb-8">
                <span>Total</span>
                <span className="text-blue-400">${cart.totalPrice}</span>
              </div>

              <button 
                onClick={checkoutHandler}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#2563eb',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  fontWeight: 'bold',
                  padding: '1.25rem',
                  borderRadius: '1rem',
                  border: 'none',
                  color: 'white'
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;