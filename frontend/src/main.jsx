import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Provides the Redux store
import { PayPalScriptProvider } from '@paypal/react-paypal-js'; // 1. Import PayPal Provider
import store from './store';           // Our central data store
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* 2. Wrap the app in PayPalScriptProvider. 
          deferLoading={true} prevents the script from loading until we actually need it on the Order screen. */}
      <PayPalScriptProvider deferLoading={true}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
);