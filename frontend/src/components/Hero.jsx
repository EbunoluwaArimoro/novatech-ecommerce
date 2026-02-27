const Hero = () => {
  const handleShopClick = () => {
    const productSection = document.getElementById('latest-products');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl shadow-xl overflow-hidden mb-10 mt-4 relative">
      <div className="px-8 py-12 md:p-16 flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 relative z-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Next-Gen Tech, <br /> 
            <span className="text-blue-500">Delivered Today.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-lg mx-auto md:mx-0">
            Discover our exclusive collection of premium electronics, smart gadgets, and high-performance accessories.
          </p>
          
          {/* BRUTE FORCE BUTTON */}
          <button 
            onClick={handleShopClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8'; // blue-700
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb'; // blue-600
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            style={{
              cursor: 'pointer',
              backgroundColor: '#2563eb',
              transition: 'all 0.3s ease-in-out',
              zIndex: 50,
              position: 'relative'
            }}
            className="font-bold py-4 px-10 rounded-full text-white border-none outline-none block mx-auto md:mx-0"
          >
            Shop the Collection
          </button>
        </div>

        {/* Premium Image Area */}
        <div className="md:w-1/2 flex justify-center md:justify-end w-full relative z-10">
          <div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-slate-700">
            <img 
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Premium Tech Setup" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/30"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;