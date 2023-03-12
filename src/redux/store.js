import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import productSlice from './slices/productSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    productSlice,
    cartSlice
  }
});