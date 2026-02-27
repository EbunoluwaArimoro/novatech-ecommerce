import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop?search=${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    // Restricted max-width to 400px and height to 10 (40px)
    <form onSubmit={submitHandler} className="flex items-stretch w-full max-w-[400px] h-10 mx-auto">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search products..."
        className="w-full px-5 rounded-l-full border-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-slate-100 outline-none text-sm font-medium h-full"
      />
      <button 
        type="submit" 
        className="bg-blue-600 text-white px-6 rounded-r-full hover:bg-blue-700 transition-colors flex items-center justify-center h-full"
      >
        <FaSearch className="text-sm" />
      </button>
    </form>
  );
};

export default SearchBox;