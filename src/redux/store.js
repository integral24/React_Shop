import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import productSlice from './slices/productSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    productSlice
  }
});