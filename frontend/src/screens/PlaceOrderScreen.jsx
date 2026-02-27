import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      toast.success('Order placed successfully!');
      // Added safety check to make sure res._id exists before navigating
      if (res && res._id) {
        navigate(`/order/${res._id}`);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4">
      <CheckoutSteps step1 step2 step3 step4 />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-4">Shipping</h2>
            <p className="text-slate-600">
              <strong className="text-slate-800">Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-4">Payment Method</h2>
            <p className="text-slate-600">
              <strong className="text-slate-800">Method: </strong>
              {cart.paymentMethod === 'PayPal' ? 'PayPal / Credit Card' : cart.paymentMethod}
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-6">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0">
                    <div className="flex items-center gap-4">
                      {/* Enforcing correct image dimensions here too */}
                      <div className="w-16 h-16 bg-slate-50 rounded-lg p-1 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                      </div>
                      <Link to={`/product/${item._id}`} className="font-bold text-slate-800 hover:text-blue-600 line-clamp-1">
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-slate-600 font-medium whitespace-nowrap">
                      {item.qty} x ${item.price} = <span className="text-slate-900 font-bold ml-1">${(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl sticky top-24">
            <h2 className="text-xl font-bold mb-6 border-b border-slate-700 pb-4 text-center">Checkout Summary</h2>
            <div className="space-y-4 mb-8 text-slate-300">
              <div className="flex justify-between"><span>Items</span><span className="text-white">${cart.itemsPrice}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="text-white">${cart.shippingPrice}</span></div>
              <div className="flex justify-between"><span>Tax</span><span className="text-white">${cart.taxPrice}</span></div>
              <div className="flex justify-between text-2xl font-extrabold border-t border-slate-700 pt-6 text-white">
                <span>Total</span><span className="text-blue-400">${cart.totalPrice}</span>
              </div>
            </div>

            <button
              type="button"
              className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 ${
                cart.cartItems.length === 0 || isLoading ? 'bg-slate-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={cart.cartItems.length === 0 || isLoading}
              onClick={placeOrderHandler}
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;