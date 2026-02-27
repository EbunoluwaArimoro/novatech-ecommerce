import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-blue-600 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="text-3xl font-extrabold text-white tracking-wider flex-shrink-0">
              <span className="text-blue-500">Nova</span>Tech
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your ultimate destination for premium electronics and next-gen gadgets. We bring the future of technology directly to your doorstep.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors"><FaInstagram /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"><FaYoutube /></a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/shop" className="hover:text-blue-400 transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=Audio" className="hover:text-blue-400 transition-colors">Audio & Headphones</Link></li>
              <li><Link to="/shop?category=Wearables" className="hover:text-blue-400 transition-colors">Smart Watches</Link></li>
              <li><Link to="/shop?category=Gaming" className="hover:text-blue-400 transition-colors">Gaming Consoles</Link></li>
              <li><Link to="/shop?category=Computers" className="hover:text-blue-400 transition-colors">Laptops & PCs</Link></li>
            </ul>
          </div>

          {/* Support (Order Tracking and Warranty Removed) */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQs</Link></li>
              <li><Link to="/shipping-info" className="hover:text-blue-400 transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>

          {/* Contact (Renamed from Contact & Legal, Policy links removed) */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex flex-col mb-2">
                <span className="text-slate-500 text-xs uppercase font-bold mb-1">Email</span>
                <a href="mailto:support@novatech.com" className="hover:text-blue-400 transition-colors">support@novatech.com</a>
              </li>
              <li className="flex flex-col mt-4">
                <span className="text-slate-500 text-xs uppercase font-bold mb-1">Phone</span>
                <span className="text-slate-300">1-800-NOVA-TEC</span>
              </li>
              <li className="flex flex-col mt-4">
                <span className="text-slate-500 text-xs uppercase font-bold mb-1">Address</span>
                <span className="text-slate-300">123 Tech Boulevard<br/>Silicon Valley, CA 94025</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>&copy; {currentYear} NovaTech. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;