import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { FaTimes, FaCheck, FaInfoCircle } from 'react-icons/fa';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="py-10 max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800">Admin: All Orders</h1>
        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
          Total Orders: {orders?.length || 0}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl">{error?.data?.message || error.error}</div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-5 text-slate-500 font-bold uppercase text-xs">ID</th>
                <th className="p-5 text-slate-500 font-bold uppercase text-xs">User</th>
                <th className="p-5 text-slate-500 font-bold uppercase text-xs">Date</th>
                <th className="p-5 text-slate-500 font-bold uppercase text-xs">Total</th>
                <th className="p-5 text-slate-500 font-bold uppercase text-xs">Paid</th>
                <th className="p-5 text-slate-500 font-bold uppercase text-xs">Delivered</th>
                <th className="p-5 text-slate-500 font-bold uppercase text-xs">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-mono text-xs text-blue-600 font-bold">#{order._id.slice(-8)}</td>
                  <td className="p-5 text-slate-700 font-medium">{order.user && order.user.name}</td>
                  <td className="p-5 text-slate-600">{order.createdAt.substring(0, 10)}</td>
                  <td className="p-5 text-slate-900 font-bold">${order.totalPrice}</td>
                  <td className="p-5">
                    {order.isPaid ? (
                      <span className="text-green-600 flex items-center font-bold text-sm">
                        <FaCheck className="mr-1" /> {order.paidAt.substring(0, 10)}
                      </span>
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                  <td className="p-5">
                    {order.isDelivered ? (
                      <span className="text-green-600 flex items-center font-bold text-sm">
                        <FaCheck className="mr-1" /> {order.deliveredAt.substring(0, 10)}
                      </span>
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                  <td className="p-5">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-xs hover:bg-blue-600 hover:text-white transition-all">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderListScreen;