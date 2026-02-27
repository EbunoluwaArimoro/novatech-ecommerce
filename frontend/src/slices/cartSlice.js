import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

// Initialize state from local storage or set defaults
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

    // This is the function ShippingScreen.jsx is looking for
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },

    // Saving the payment method (PayPal, Stripe, etc.)
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },

    // Clear cart after an order is placed
    clearCartItems: (state) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

// CRITICAL: We must export the actions so ShippingScreen can import them
export const { 
  addToCart, 
  removeFromCart, 
  saveShippingAddress, 
  savePaymentMethod,
  clearCartItems 
} = cartSlice.actions;

export default cartSlice.reducer;