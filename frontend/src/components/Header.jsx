import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import { FaShoppingCart, FaUser, FaCaretDown, FaSignOutAlt, FaUserEdit, FaStore, FaListUl } from 'react-icons/fa';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCatMenuOpen, setIsCatMenuOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const categories = ['Audio', 'Wearables', 'Gaming', 'Computers', 'Smart Home'];

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setIsUserMenuOpen(false);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-slate-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-y-4">
          
          <Link to="/" className="text-2xl font-extrabold text-white tracking-wider flex-shrink-0">
            <span className="text-blue-500">Nova</span>Tech
          </Link>

          <div className="hidden lg:block flex-grow max-w-xl mx-8">
            <SearchBox />
          </div>

          <nav className="flex items-center space-x-6 md:space-x-8">
            
            <div className="hidden md:flex items-center space-x-6 text-sm font-bold tracking-wide">
              <Link to="/shop" className="text-gray-300 hover:text-white transition flex items-center">
                <FaStore className="mr-2" /> Shop
              </Link>
              
              {/* CATEGORY DROPDOWN */}
              <div 
                className="relative"
                onMouseEnter={() => setIsCatMenuOpen(true)}
                onMouseLeave={() => setIsCatMenuOpen(false)}
              >
                <button className="text-gray-300 hover:text-white transition flex items-center focus:outline-none py-2">
                  <FaListUl className="mr-2" /> Categories <FaCaretDown className="ml-1" />
                </button>
                
                {isCatMenuOpen && (
                  <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-2xl py-2 z-20 border border-slate-100 overflow-hidden">
                    {categories.map((cat) => (
                      <Link 
                        key={cat} 
                        to={`/shop?category=${cat}`}
                        className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Link to="/cart" className="relative text-gray-300 hover:text-white flex items-center font-medium transition duration-300">
              <FaShoppingCart className="mr-2 text-xl" /> 
              <span className="hidden sm:inline">Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -left-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-md border-2 border-slate-900">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-gray-300 hover:text-white font-medium transition duration-300 focus:outline-none bg-slate-800 px-4 py-2 rounded-lg border border-slate-700"
                >
                  <FaUser className="mr-2 text-blue-400" />
                  <span className="hidden sm:inline">{userInfo.name.split(' ')[0]}</span>
                  <FaCaretDown className={`ml-2 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)}></div>
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl py-2 z-20 border border-slate-100 overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Account</p>
                        <p className="text-sm font-medium text-slate-600 truncate">{userInfo.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <FaUserEdit className="mr-3 text-slate-400" /> Profile Settings
                      </Link>
                      <button onClick={logoutHandler} className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors border-t border-slate-50">
                        <FaSignOutAlt className="mr-3" /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20">
                Sign In
              </Link>
            )}
          </nav>
        </div>

        <div className="lg:hidden w-full mt-4">
          <SearchBox />
        </div>
      </div>
    </header>
  );
};

export default Header;