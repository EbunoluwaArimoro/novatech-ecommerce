import { Link } from 'react-router-dom';
import { useGetProductsQuery, useDeleteProductMutation, useCreateProductMutation } from '../../slices/productsApiSlice';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success('Product deleted');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
        toast.success('Product Created');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800">Admin: Products</h1>
        <button 
          onClick={createProductHandler}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <FaPlus className="mr-2" /> Create Product
        </button>
      </div>

      {loadingDelete && <div className="text-blue-600 font-bold animate-pulse mb-4 text-center">Deleting...</div>}
      {loadingCreate && <div className="text-blue-600 font-bold animate-pulse mb-4 text-center">Creating...</div>}

      {isLoading ? (
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl">{error?.data?.message || error.error}</div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-5 text-slate-500 font-bold uppercase text-xs">ID</th>
                <th className="p-5 text-slate-500 font-bold uppercase text-xs">Name</th>
                <th className="p-5 text-slate-500 font-bold uppercase text-xs">Price</th>
                <th className="p-5 text-slate-500 font-bold uppercase text-xs">Category</th>
                <th className="p-5 text-slate-500 font-bold uppercase text-xs">Brand</th>
                <th className="p-5 text-slate-500 font-bold uppercase text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 text-xs text-slate-400 font-mono">#{product._id.slice(-5)}</td>
                  <td className="p-5 text-slate-800 font-bold">{product.name}</td>
                  <td className="p-5 text-slate-900 font-medium">${product.price}</td>
                  <td className="p-5 text-slate-600">{product.category}</td>
                  <td className="p-5 text-slate-600">{product.brand}</td>
                  <td className="p-5">
                    <div className="flex items-center space-x-3">
                      <Link to={`/admin/product/${product._id}/edit`} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                        <FaEdit />
                      </Link>
                      <button 
                        onClick={() => deleteHandler(product._id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                      >
                        <FaTrash />
                      </button>
                    </div>
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

export default ProductListScreen;