import { useLocation, Link } from 'react-router-dom';
import { FaShieldAlt, FaFileContract, FaEnvelope, FaQuestionCircle, FaTruck, FaCookieBite, FaArrowLeft } from 'react-icons/fa';

const InfoScreen = () => {
  const { pathname } = useLocation();

  let content = { title: '', icon: null, text: '' };

  // Switch content based on URL
  if (pathname === '/privacy') {
    content = {
      title: 'Privacy Policy', icon: <FaShieldAlt className="text-blue-500 mr-4" />,
      text: 'At NovaTech, we take your privacy seriously. All data is encrypted using AES-256 protocols. We never sell your personal data to third parties. Your payment information is securely tokenized via PayPal and is never stored on our direct servers.\n\nData Collection:\nWe only collect data necessary to process your orders and improve your shopping experience.'
    };
  } else if (pathname === '/terms') {
    content = {
      title: 'Terms of Service', icon: <FaFileContract className="text-blue-500 mr-4" />,
      text: 'By accessing and placing an order with NovaTech, you confirm that you are in agreement with and bound by our terms of service.\n\nPrices are subject to change without notice. We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion, particularly in cases of suspected fraud.'
    };
  } else if (pathname === '/contact') {
    content = {
      title: 'Contact Us', icon: <FaEnvelope className="text-blue-500 mr-4" />,
      text: 'Need assistance? Our customer success team is available 24/7.\n\nEmail: support@novatech.com\nPhone: 1-800-NOVA-TEC\nAddress: 123 Tech Boulevard, Silicon Valley, CA 94025\n\nPlease allow 24-48 hours for email responses during peak holiday seasons.'
    };
  } else if (pathname === '/faq') {
    content = {
      title: 'Frequently Asked Questions', icon: <FaQuestionCircle className="text-blue-500 mr-4" />,
      text: 'Q: How long does shipping take?\nA: Standard shipping takes 3-5 business days. Expedited shipping takes 1-2 days.\n\nQ: Do you offer international shipping?\nA: Yes, we ship to over 100 countries worldwide.\n\nQ: What is your return policy?\nA: We offer a 30-day money-back guarantee on all unopened items.'
    };
  } else if (pathname === '/shipping-info') {
    content = {
      title: 'Shipping & Returns', icon: <FaTruck className="text-blue-500 mr-4" />,
      text: 'Shipping:\nOrders placed before 2 PM EST are processed the same day. Standard shipping is free on orders over $100.\n\nReturns:\nTo initiate a return, contact support@novatech.com. Items must be returned in their original packaging. A 15% restocking fee applies to opened electronics.'
    };
  } else if (pathname === '/cookie-policy') {
    content = {
      title: 'Cookie Policy', icon: <FaCookieBite className="text-blue-500 mr-4" />,
      text: 'NovaTech uses cookies to keep your session secure, remember your cart items, and analyze website traffic. By continuing to use our site, you consent to our use of essential cookies required for the shopping cart and checkout process.'
    };
  } else {
    content = {
      title: 'Information Center', icon: <FaQuestionCircle className="text-blue-500 mr-4" />,
      text: 'Welcome to the NovaTech Information Center. Please use the footer menu to find what you are looking for.'
    };
  }

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 min-h-[60vh]">
      <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <FaArrowLeft className="mr-2" /> Back to Home
      </Link>
      <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8 flex items-center border-b border-slate-100 pb-6">
          {content.icon}
          {content.title}
        </h1>
        <div className="prose prose-lg text-slate-600 whitespace-pre-line leading-relaxed">
          {content.text}
        </div>
      </div>
    </div>
  );
};

export default InfoScreen;