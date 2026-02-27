import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // Security check: If no shipping address, redirect back to shipping
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <CheckoutSteps step1 step2 step3 />
      
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Payment Method</h1>
        <p className="text-slate-500 mb-8">Select how you would like to pay</p>
        
        <form onSubmit={submitHandler}>
          <div className="space-y-4 mb-8">
            <label className="flex items-center p-4 border-2 border-blue-500 bg-blue-50 rounded-2xl cursor-pointer transition-all">
              <input
                type="radio"
                className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-4 font-bold text-slate-800 text-lg flex items-center">
                PayPal or Credit Card
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
                  alt="PayPal" 
                  className="h-5 ml-3"
                />
              </span>
            </label>

            {/* Placeholder for future methods like Stripe */}
            <label className="flex items-center p-4 border-2 border-slate-100 rounded-2xl opacity-50 cursor-not-allowed">
              <input
                type="radio"
                disabled
                className="w-5 h-5 text-slate-300"
                name="paymentMethod"
              />
              <span className="ml-4 font-bold text-slate-400 text-lg">
                Stripe (Coming Soon)
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Continue to Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;