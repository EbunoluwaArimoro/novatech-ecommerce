import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ShopScreen from './screens/ShopScreen';
import InfoScreen from './screens/InfoScreen';

// Admin Screens
import ProductListScreen from './screens/admin/ProductListScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen'; // THE MISSING IMPORT

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-4">
        <Routes>
          {/* Publicly Accessible Routes */}
          <Route path="/" element={<><Hero /><HomeScreen /></>} />
          <Route path="/shop" element={<ShopScreen />} /> 
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          
          {/* Informational Pages */}
          <Route path="/privacy" element={<InfoScreen />} />
          <Route path="/terms" element={<InfoScreen />} />
          <Route path="/contact" element={<InfoScreen />} />
          <Route path="/faq" element={<InfoScreen />} />
          <Route path="/shipping-info" element={<InfoScreen />} />
          <Route path="/cookie-policy" element={<InfoScreen />} />

          {/* Customer Private Routes (Must be logged in) */}
          <Route path='' element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
          </Route>

          {/* Admin Private Routes (Must be an Admin) */}
          <Route path='' element={<AdminRoute />}>
            <Route path="/admin/orderlist" element={<OrderListScreen />} />
            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} /> {/* THE MISSING ROUTE */}
          </Route>

        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;