import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { 
  useGetOrderDetailsQuery, 
  usePayOrderMutation, 
  useGetPayPalClientIdQuery 
} from '../slices/ordersApiSlice';
import { FaShippingFast, FaCheckCircle, FaInfoCircle, FaCreditCard } from 'react-icons/fa';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: { 
            'client-id': paypal.clientId, 
            currency: 'USD',
            'disable-funding': 'paylater,venmo' 
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      // Make sure order exists before checking isPaid!
      if (order && !order.isPaid) {
        if (!window.paypal) { loadPayPalScript(); }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment Successful');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [{ amount: { value: order.totalPrice } }],
    }).then((orderID) => { return orderID; });
  }

  // 🔴 STRICT CRASH PREVENTION: Do not render anything until the order data is ready
  if (isLoading || !order) return (
    <div className="flex flex-col justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-slate-500 font-bold">Loading secure checkout...</p>
    </div>
  );

  if (error) return <div className="text-center py-20 text-red-500">{error?.data?.message || error.error}</div>;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-8">
        Order <span className="text-blue-600 text-xl font-mono uppercase tracking-tighter">
          #{order._id.slice(-8)} 
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <FaShippingFast className="mr-3 text-blue-500" /> Shipping
            </h2>
            <div className="space-y-1 text-slate-600 mb-4">
              <p><strong>Name:</strong> {order.user?.name}</p>
              <p><strong>Email:</strong> {order.user?.email}</p>
              <p><strong>Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}</p>
            </div>
            {order.isDelivered ? (
              <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold border border-green-100">
                <FaCheckCircle className="mr-2" /> Delivered
              </div>
            ) : (
              <div className="inline-flex items-center px-4 py-2 bg-slate-50 text-slate-500 rounded-full text-sm font-bold border border-slate-200">
                <FaInfoCircle className="mr-2" /> Awaiting Shipment
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <FaCreditCard className="mr-3 text-blue-500" /> Payment
            </h2>
            <p className="text-slate-600 mb-4">
              <strong>Method:</strong> PayPal or Credit Card
            </p>
            {order.isPaid ? (
              <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold border border-green-100">
                <FaCheckCircle className="mr-2" /> Paid on {order.paidAt.substring(0, 10)}
              </div>
            ) : (
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold border border-blue-100">
                <FaInfoCircle className="mr-2" /> Awaiting Payment
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems?.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-lg p-1 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                    </div>
                    <Link to={`/product/${item.product}`} className="font-bold text-slate-800 hover:text-blue-600 line-clamp-1">
                      {item.name}
                    </Link>
                  </div>
                  <div className="text-slate-600 font-medium whitespace-nowrap">
                    {item.qty} x ${item.price} = <span className="text-slate-900 font-bold">${(item.qty * item.price).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl sticky top-24">
            <h2 className="text-xl font-bold mb-6 border-b border-slate-700 pb-4 text-center">Summary</h2>
            <div className="space-y-4 mb-8 text-slate-300">
              <div className="flex justify-between"><span>Subtotal</span><span className="text-white">${order.itemsPrice}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="text-white">${order.shippingPrice}</span></div>
              <div className="flex justify-between"><span>Tax</span><span className="text-white">${order.taxPrice}</span></div>
              <div className="flex justify-between text-2xl font-extrabold border-t border-slate-700 pt-6 text-white">
                <span>Total</span><span className="text-blue-400">${order.totalPrice}</span>
              </div>
            </div>

            {!order.isPaid && (
              <div className="space-y-4">
                {isPending ? (
                   <div className="bg-slate-800 p-6 rounded-2xl text-center">
                      <p className="text-xs text-slate-500 font-bold animate-pulse uppercase">Connecting Securely...</p>
                   </div>
                ) : (
                  <div className="bg-white p-4 rounded-2xl">
                    <PayPalButtons 
                      createOrder={createOrder} 
                      onApprove={onApprove} 
                      onError={onError}
                      style={{ 
                        layout: 'vertical', 
                        shape: 'rect', 
                        color: 'blue',
                        label: 'pay',
                        tagline: false 
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;