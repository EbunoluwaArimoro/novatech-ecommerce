import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// We leave the baseUrl empty because we are using a proxy in vite.config.js
const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}), // Endpoints are injected by other slices
});