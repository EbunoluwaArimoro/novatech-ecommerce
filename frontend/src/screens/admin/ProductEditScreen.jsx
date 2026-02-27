import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUpdateProductMutation, useGetProductDetailsQuery } from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({ productId, name, price, image, brand, category, countInStock, description }).unwrap();
      toast.success('Product updated');
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4">
      <Link to="/admin/productlist" className="inline-flex items-center text-slate-600 hover:text-blue-600 mb-6 font-bold">
        <FaArrowLeft className="mr-2" /> Back to Product List
      </Link>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-8">Edit Product</h1>
        {loadingUpdate && <div className="text-blue-600 font-bold animate-pulse mb-4">Updating...</div>}
        {isLoading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        ) : error ? (
          <div className="text-red-600">{error?.data?.message || error.error}</div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 font-bold mb-2 text-sm">Product Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2 text-sm">Price ($)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-2 text-sm">Image URL</label>
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-slate-700 font-bold mb-2 text-sm">Brand</label>
                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2 text-sm">Category</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2 text-sm">Stock Count</label>
                <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-2 text-sm">Description</label>
              <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98]">
              Update Product
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEditScreen;